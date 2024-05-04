'use server';

import { desc, eq } from 'drizzle-orm';

import { db } from '@/db';
import { expenses, type ExpensesWithRelations } from '@/db/schema/expenses';

const sleep = (time: number) =>
	new Promise(resolve => setTimeout(resolve, time));

export const getUserReceivedTotal = async (
	userId: string
): Promise<[number, number]> => {
	const receivedTotal = 231.89;
	const receivedChange = 20.1;

	await sleep(2000);

	return [receivedTotal, receivedChange];
};

export const getUserSendTotal = async (
	userId: string
): Promise<[number, number]> => {
	const sendTotal = 231.89;
	const sendChange = 180.1;

	await sleep(2000);

	return [sendTotal, sendChange];
};

export const getUserOwedTotal = async (
	userId: string
): Promise<[number, number]> => {
	const owedTotal = 231.89;
	const owedChange = 19;

	await sleep(2000);

	return [owedTotal, owedChange];
};

export const getUserOweTotal = async (
	userId: string
): Promise<[number, number]> => {
	const oweTotal = 231.89;
	const oweChange = 201;

	await sleep(2000);

	return [oweTotal, oweChange];
};

export const getExpensesRecent = async (
	limit?: number
): Promise<ExpensesWithRelations[]> => {
	const result: ExpensesWithRelations[] = await db.query.expenses.findMany({
		with: {
			group: true,
			paidBy: true,
			category: true
		},
		orderBy: [desc(expenses.createdAt)],
		limit
	});

	await sleep(2000);
	return result;
};
