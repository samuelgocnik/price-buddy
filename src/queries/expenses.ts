'use server';

import { desc, eq, inArray } from 'drizzle-orm';

import { db } from '@/db';
import { expenses } from '@/db/schema/expenses';
import { usersGroups } from '@/db/schema/userGroups';

export const getUsersExpenes = async (userId: string) => {
	const ug = await db.query.usersGroups.findMany({
		where: eq(usersGroups.userId, userId)
	});
	const userGroupsIds = ug.filter(x => !x.deletedAt).map(ug => ug.groupId);

	const expensesInUsersGroups = await db.query.expenses.findMany({
		where: inArray(expenses.groupId, userGroupsIds),
		with: {
			paidBy: true,
			group: true
		},
		orderBy: [desc(expenses.createdAt)]
	});

	return expensesInUsersGroups.filter(e => !e.deletedAt);
};
