'use server';

import { desc, eq, inArray, and, isNull } from 'drizzle-orm';

import { db } from '@/db';
import { expenses } from '@/db/schema/expenses';
import { usersGroups } from '@/db/schema/userGroups';

export const getUsersExpenes = async (userId: string) => {
	const ug = await db.query.usersGroups.findMany({
		where: and(eq(usersGroups.userId, userId), isNull(usersGroups.deletedAt))
	});
	const userGroupsIds = ug.map(ug => ug.groupId);

	if (userGroupsIds.length === 0) {
		return null;
	}

	return await db.query.expenses.findMany({
		where: and(
			isNull(expenses.deletedAt),
			inArray(expenses.groupId, userGroupsIds)
		),
		with: {
			paidBy: true,
			group: true
		},
		orderBy: [desc(expenses.createdAt)]
	});
};
