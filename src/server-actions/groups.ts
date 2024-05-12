'use server';
import { revalidatePath } from 'next/cache';

import { db } from '@/db';
import { groups } from '@/db/schema/groups';
import { type addGroupParams } from '@/queries/groupsMutations';

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
