'use server';

import { desc } from 'drizzle-orm';

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
	const balanceBetweenUsers: UserBalances[] =
		await db.query.userBalances.findMany({
			where: eq(userBalances.user1Id, userId)
		});

	// Balance between users:
	// balance > 0  -> user1 owes user2
	// balance < 0  -> user2 owes user1
	const owedTotal = balanceBetweenUsers
		.filter(b => +b.balance < 0)
		.reduce((acc, b) => safeAccAdd(acc, b.balance), 0.0);

	const owedChange = NaN; // TODO

	await sleep(2000);

	return [owedTotal, owedChange];
};

export const getUserOweTotal = async (
	userId: string
): Promise<[number, number]> => {
	const balanceBetweenUsers: UserBalances[] =
		await db.query.userBalances.findMany({
			where: eq(userBalances.user1Id, userId)
		});

	// Balance between users:
	// balance > 0  -> user1 owes user2
	// balance < 0  -> user2 owes user1
	const oweTotal = balanceBetweenUsers
		.filter(b => +b.balance > 0)
		.reduce((acc, b) => safeAccAdd(acc, b.balance), 0.0);

	const oweChange = NaN; // TODO

	await sleep(2000);

	return [oweTotal, oweChange];
};

export const getExpensesRecent = async (
	userId: string,
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

const safeAccAdd = (acc: number, num: string) => {
	const n = Number.parseFloat(num);
	return acc + (Number.isNaN(n) ? 0.0 : n);
};
