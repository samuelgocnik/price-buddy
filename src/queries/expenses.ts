'use server';

import { and, eq, isNull } from 'drizzle-orm';

import { db } from '@/db';
import {
	type Expenses,
	expenses,
	type ExpensesWithRelations
} from '@/db/schema/expenses';
import { type UserBalances, userBalances } from '@/db/schema/userBalances';
import {
	type AmountAndDate,
	calculateAmountAndMonthChange,
	sleep
} from '@/lib/utils';

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
	// Find all expenses created by the user
	const userExpenses: Expenses[] = await db.query.expenses.findMany({
		where: and(eq(expenses.paidById, userId), isNull(expenses.deletedAt))
	});

	const amountAndDate: AmountAndDate[] = userExpenses.map(expense => ({
		amount: expense.amount,
		date: expense.createdAt
	}));

	const [amountTotal, monthChangePercentage] =
		calculateAmountAndMonthChange(amountAndDate);

	await sleep(2000);
	return [amountTotal, monthChangePercentage];
};

export const getUserOwedTotal = async (
	userId: string
): Promise<[number, number]> => {
	const balanceBetweenUsers: UserBalances[] =
		await db.query.userBalances.findMany({
			where: and(
				eq(userBalances.user1Id, userId),
				isNull(userBalances.deletedAt)
			)
		});

	// Balance between users:
	// balance > 0  -> user1 owes user2
	// balance < 0  -> user2 owes user1
	const amountAndDate: AmountAndDate[] = balanceBetweenUsers
		.filter(balance => +balance.balance < 0)
		.map(balance => ({
			amount: balance.balance,
			date: balance.createdAt
		}));

	const [amount, percentage] = calculateAmountAndMonthChange(amountAndDate);

	await sleep(2000);
	return [amount, percentage];
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
	const amountAndDate: AmountAndDate[] = balanceBetweenUsers
		.filter(balance => +balance.balance > 0)
		.map(balance => ({
			amount: balance.balance,
			date: balance.createdAt
		}));

	const [owe, percentage] = calculateAmountAndMonthChange(amountAndDate);

	await sleep(2000);
	return [owe, percentage];
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
