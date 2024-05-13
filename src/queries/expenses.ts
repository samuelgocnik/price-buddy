'use server';

import { and, desc, eq, inArray, isNull } from 'drizzle-orm';

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
import { usersGroups } from '@/db/schema/userGroups';

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
			where: and(
				eq(userBalances.user1Id, userId),
				isNull(userBalances.deletedAt)
			)
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

export const getExpensesRecent = async (
	userId: string,
	limit?: number
): Promise<ExpensesWithRelations[]> => {
	// Get all groups for the user
	const foundGroups: { groupId: string }[] =
		await db.query.usersGroups.findMany({
			columns: {
				groupId: true
			},
			where: and(eq(usersGroups.userId, userId), isNull(usersGroups.deletedAt))
		});
	const groupIds: string[] = foundGroups.map(group => group.groupId);

	if (groupIds.length === 0) {
		return [];
	}

	// Find all expenses from the groups
	// Display the latests [limit] expenses
	const relatedExpenses = await db.query.expenses.findMany({
		where: and(inArray(expenses.groupId, groupIds), isNull(expenses.deletedAt)),
		orderBy: [desc(expenses.createdAt)],
		with: {
			group: true,
			paidBy: true,
			category: true
		},
		limit
	});

	// console.log("Latest expenses:", relatedExpenses);

	await sleep(2000);
	return relatedExpenses;
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
