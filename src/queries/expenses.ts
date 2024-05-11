'use server';

import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { expenses } from '@/db/schema/expenses';

export const getGroupsExpenses = async (id: string) => {
	const ge = await db.query.expenses.findMany({
		where: eq(expenses.groupId, id),
		with: {
			paidBy: true
		}
	});
	return ge.filter(e => !e.deletedAt);
};

export const deleteExpense = async (id: string) => {
	await db
		.update(expenses)
		.set({ deletedAt: new Date().toString() })
		.where(eq(expenses.id, id));
};
