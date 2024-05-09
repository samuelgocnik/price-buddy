'use server';
import { revalidatePath } from 'next/cache';

import { type ExpensesCreate, expenses } from '@/db/schema/expenses';
import { db } from '@/db';

import { updateBalancesAfterExpense } from './userBalances';

export const addExpenseAction = async (expense: ExpensesCreate) => {
	const expenseResult = await db.insert(expenses).values(expense).returning();
	if (expenseResult.length > 0) {
		await updateBalancesAfterExpense(
			expense.paidById,
			expense.groupId,
			parseFloat(expense.amount)
		);
	}
	revalidatePath('/dashboard');
};
