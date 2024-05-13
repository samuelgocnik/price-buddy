'use server';
import { revalidatePath } from 'next/cache';
import { and, eq, isNull } from 'drizzle-orm';

import { db } from '@/db';
import { groups } from '@/db/schema/groups';
import { type addGroupParams } from '@/queries/groupsMutations';
import { users } from '@/db/schema/users';
import { usersGroups } from '@/db/schema/userGroups';

import { addUserToGroupAction } from './usersGroup';

export const addGroupAction = async (data: addGroupParams) => {
	const result = await db.insert(groups).values(data).returning();
	const insertedUsers = await addUserToGroupAction(
		data.emails,
		result[0].id,
		data.authorId
	);
	revalidatePath('/dashboard');
	return insertedUsers;
};

export type addUserToGroupParams = {
	email: string;
	groupId: string;
};

export const addSingleUserToGroupAction = async (
	data: addUserToGroupParams
) => {
	const foundUser = await db.query.users.findFirst({
		where: and(eq(users.email, data.email), isNull(users.deletedAt))
	});

	if (foundUser === undefined) {
		return 'User is not registered in our application';
	}

	const usersAlreadyInGroup = await db.query.groups.findFirst({
		where: eq(groups.id, data.groupId),
		with: {
			users: true
		}
	});

	if (usersAlreadyInGroup?.users.map(x => x.userId).includes(foundUser.id)) {
		return 'User is already in the group!';
	}

	await db
		.insert(usersGroups)
		.values({ groupId: data.groupId, userId: foundUser.id });
	revalidatePath('/group/id');
};
