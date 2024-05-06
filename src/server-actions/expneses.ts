import { revalidatePath } from 'next/cache';

import { expenses, type Expenses } from '@/db/schema/expenses';
import { db } from '@/db';

export const addExpense = async (expense: Expenses) => {
	await db.insert(expenses).values(expense);
	revalidatePath('/dashboard');
};
