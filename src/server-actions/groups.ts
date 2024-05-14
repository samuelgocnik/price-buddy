'use server';
import { revalidatePath } from 'next/cache';
import { and, eq, isNull } from 'drizzle-orm';

import { db } from '@/db';
import { groups } from '@/db/schema/groups';
import { type AddGroupParams } from '@/queries/groupsMutations';
import { users } from '@/db/schema/users';
import { usersGroups } from '@/db/schema/userGroups';

import { addUserToGroupAction } from './usersGroup';

export const addGroupAction = async (data: AddGroupParams) => {
	const result = await db.insert(groups).values(data).returning();
	if (result.length === 0) {
		throw new Error('Failed to insert group!');
	}
	const insertedUsers = await addUserToGroupAction(
		data.emails,
		result[0].id,
		data.authorId
	);
	revalidatePath('/dashboard');
	return insertedUsers;
};

export type AddUserToGroupParams = {
	email: string;
	groupId: string;
};

export const addSingleUserToGroupAction = async (
	data: AddUserToGroupParams
) => {
	const foundUser = await db.query.users.findFirst({
		where: and(eq(users.email, data.email), isNull(users.deletedAt))
	});

	if (foundUser === undefined) {
		throw new Error('User not registered in our application');
	}

	const usersAlreadyInGroup = await db.query.groups.findFirst({
		where: and(eq(groups.id, data.groupId), isNull(groups.deletedAt)),
		with: {
			users: true
		}
	});

	if (usersAlreadyInGroup?.users.map(x => x.userId).includes(foundUser.id)) {
		throw new Error('User is already in the group!');
	}

	const userGroupsResult = await db
		.insert(usersGroups)
		.values({ groupId: data.groupId, userId: foundUser.id })
		.returning();
	if (userGroupsResult.length === 0) {
		throw new Error('Failed to add the user in the group!');
	}
	revalidatePath('/group/id');
	return userGroupsResult;
};
