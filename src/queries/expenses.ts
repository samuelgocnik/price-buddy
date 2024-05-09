'use server';

import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { expenses } from '@/db/schema/expenses';

export const getGroupsExpenses = async (id: string) =>
	await db.query.expenses.findMany({
		where: eq(expenses.groupId, id) //,
		// with: {
		// 	user: true // TODO 2
		// }
	});
