'use server';
import { revalidatePath } from 'next/cache';

import { type ExpensesCreate, expenses } from '@/db/schema/expenses';
import { db } from '@/db';
import { usersExpenses } from '@/db/schema/usersExpenses';

import { updateBalancesAfterExpense } from './userBalances';

export const addExpenseAction = async (expense: ExpensesCreate) => {
	const expenseResult = await db.insert(expenses).values(expense).returning();
	if (expenseResult.length > 0) {
		const relationResult = await db
			.insert(usersExpenses)
			.values({
				userId: expense.paidById,
				expenseId: expenseResult[0].id
			})
			.returning();
		if (relationResult.length === 0) {
			throw new Error('Failed to insert expense relation to user!');
		}
		await updateBalancesAfterExpense(
			expense.paidById,
			expense.groupId,
			parseFloat(expense.amount)
		);
	} else {
		throw new Error('Failed to insert expense!');
	}
	revalidatePath('/dashboard');
};
