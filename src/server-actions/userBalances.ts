'use server';

import { and, eq, isNull } from 'drizzle-orm';

import { db } from '@/db';
import { usersGroups } from '@/db/schema/userGroups';
import { type UserBalances, userBalances } from '@/db/schema/userBalances';

export const updateBalancesAfterExpense = async (
	paid_by_id: string,
	group_id: string,
	amount: number
) => {
	const users = (await findGroupUsersByGroupId(group_id))
		.map(x => x.userId)
		.filter(x => x !== paid_by_id);

	const amountEach = amount / (users.length + 1);
	users.forEach(async group_user_id => {
		const balances = await findUsersBalance(paid_by_id, group_user_id);
		if (balances.length === 0) {
			insertNonExistingBalance(true, paid_by_id, group_user_id, amountEach);

			const amountEachReversed = amountEach * -1;
			insertNonExistingBalance(
				false,
				paid_by_id,
				group_user_id,
				amountEachReversed
			);
		} else {
			updateExistingBalance(balances[0], paid_by_id, amountEach);
			updateExistingBalance(balances[1], paid_by_id, amountEach);
		}
	});
};

const insertNonExistingBalance = async (
	isPaidByCurrentUser: boolean,
	paid_by_id: string,
	group_user_id: string,
	amountEach: number
) => {
	const dataUser1 = {
		user2Id: isPaidByCurrentUser ? paid_by_id : group_user_id,
		user1Id: isPaidByCurrentUser ? group_user_id : paid_by_id,
		balance: amountEach.toString()
	};
	const resultUser1 = await db
		.insert(userBalances)
		.values(dataUser1)
		.returning();
	if (resultUser1.length === 0) {
		throw new Error('Failed to update balances!');
	}
};

const updateExistingBalance = async (
	balance: UserBalances,
	paid_by_id: string,
	amountEach: number
) => {
	const oldBalance = parseFloat(balance.balance);
	const newBalance =
		balance.user2Id === paid_by_id
			? oldBalance + amountEach
			: oldBalance - amountEach;
	const result = await db
		.update(userBalances)
		.set({ balance: newBalance.toString() })
		.where(eq(userBalances.id, balance.id))
		.returning();

	if (result.length === 0) {
		throw new Error('Failed to update balances!');
	}
};

const findUsersBalance = async (user_1_id: string, user_2_id: string) =>
	await db.query.userBalances.findMany({
		where: (userBalances, { eq, or, and, ne }) =>
			and(
				or(
					eq(userBalances.user1Id, user_1_id),
					eq(userBalances.user1Id, user_2_id)
				),
				or(
					eq(userBalances.user2Id, user_1_id),
					eq(userBalances.user2Id, user_2_id)
				),
				ne(userBalances.user1Id, userBalances.user2Id),
				isNull(userBalances.deletedAt)
			)
	});

const findGroupUsersByGroupId = async (group_id: string) =>
	await db.query.usersGroups.findMany({
		where: and(eq(usersGroups.groupId, group_id), isNull(usersGroups.deletedAt))
	});
