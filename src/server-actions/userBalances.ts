'use server';
import { and, eq, isNull } from 'drizzle-orm';

import { db } from '@/db';
import { usersGroups } from '@/db/schema/userGroups';
import { userBalances } from '@/db/schema/userBalances';

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
		const balance = await findUsersBalance(paid_by_id, group_user_id);
		if (balance === undefined) {
			const data = {
				user2Id: paid_by_id,
				user1Id: group_user_id,
				balance: amountEach.toString()
			};
			await db.insert(userBalances).values(data).returning();
		} else {
			const oldBalance = parseFloat(balance.balance);
			const newBalance =
				balance.user2Id === paid_by_id
					? oldBalance + amountEach
					: oldBalance - amountEach;
			await db
				.update(userBalances)
				.set({ balance: newBalance.toString() })
				.where(eq(userBalances.id, balance.id));
		}
	});
};

const findUsersBalance = async (user_1_id: string, user_2_id: string) =>
	await db.query.userBalances.findFirst({
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
