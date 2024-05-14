import { and, eq, isNull } from 'drizzle-orm';

import { db } from '@/db';
import {
	userBalances,
	type BalancesWithUsers,
	type UserBalances
} from '@/db/schema/userBalances';
import { safeAccAdd, sleep } from '@/lib/utils';

export const getAllBalances = async (
	userId: string
): Promise<BalancesWithUsers[]> => {
	const balances: BalancesWithUsers[] = await db.query.userBalances.findMany({
		columns: {
			id: true,
			balance: true
		},
		where: and(
			eq(userBalances.user1Id, userId),
			isNull(userBalances.deletedAt)
		),
		with: {
			user1: true,
			user2: true
		}
	});

	// console.log('Balances:', balances);
	await sleep(2000);
	return balances;
};

export const getUserTotalBalance = async (userId: string): Promise<number> => {
	const balances: UserBalances[] = await db.query.userBalances.findMany({
		where: and(eq(userBalances.user1Id, userId), isNull(userBalances.deletedAt))
	});

	const totalBalance = balances.reduce(
		(acc, balance) => safeAccAdd(acc, balance.balance),
		0.0
	);
	await sleep(2000);
	return totalBalance;
};
