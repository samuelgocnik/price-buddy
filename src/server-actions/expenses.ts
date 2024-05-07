'use server';
import { revalidatePath } from 'next/cache';

import { type ExpensesCreate, expenses } from '@/db/schema/expenses';
import { db } from '@/db';

export const addExpenseAction = async (expense: ExpensesCreate) => {
	await db.insert(expenses).values(expense);
	revalidatePath('/dashboard');
};
