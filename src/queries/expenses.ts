'use server';

import { desc, eq, and, isNull, inArray } from 'drizzle-orm';

import { db } from '@/db';
import {
	type Expenses,
	expenses,
	type ExpensesWithRelations
} from '@/db/schema/expenses';
import { type UserBalances, userBalances } from '@/db/schema/userBalances';
import { usersGroups } from '@/db/schema/userGroups';

const sleep = (time: number) =>
	new Promise(resolve => setTimeout(resolve, time));

// TODO not sure how to get amounts send to the user
export const getUserReceivedTotal = async (
	userId: string
): Promise<[number, number]> => {
	const receivedTotal = 231.89;
	const receivedChange = 20.1;

	await sleep(2000);

	return [receivedTotal, receivedChange];
};

/**
 * Calculates the total amount of money for the user
 * based on the expenses the user created.
 *
 * Additionally, takes expenses from the last month and calculates the percentage of change.
 *
 * @param userId
 * @returns
 */
export const getUserSendTotal = async (
	userId: string
): Promise<[number, number]> => {
	// Find all expenses for the user
	const userExpenses: Expenses[] = await db.query.expenses.findMany({
		where: eq(expenses.paidById, userId)
	});

	// Calculate the total amount
	const amountTotal = userExpenses.reduce(
		(acc, expense) => safeAccAdd(acc, expense.amount),
		0.0
	);

	// Get all expenses for the last month
	const expenseLastMonth = userExpenses.filter(
		expense => new Date(expense.createdAt).getMonth() === new Date().getMonth()
	);
	// Calculate the total amount for the last month
	const sendLastMonth = expenseLastMonth.reduce(
		(acc, expense) => safeAccAdd(acc, expense.amount),
		0.0
	);

	// TODO did I calculate it correctly? or should it be calculated not from overall total amount, but using expenses before the last month?
	// Calculate the percentage of change between users total and last month
	const percentage = (sendLastMonth / amountTotal) * 100;
	// Fixed 2 decimal places. (no expenses in database would give pertenate NaN, convert to default 0.0)
	const amountChange = Number.isNaN(percentage) ? 0.0 : +percentage.toFixed(2);

	await sleep(2000);
	return [amountTotal, amountChange];
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

// TODO expenses we show in the dashboard, SHOULD be ralated to the user!!!
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
