import { Suspense } from 'react';

import { type User } from '@/db/schema/users';
import { getUserTotalBalance } from '@/queries/balance';

import { LoaderCentered } from '../ui/loader';

export type BalanceHeaderProps = {
	userId: User['id'];
};

export const BalanceHeader = ({ userId }: BalanceHeaderProps) => {
	// const headerText = 'Transaction Balances';
	const headerText = 'User Balance';
	const subText = 'Keep track of depts with your friends.';

	return (
		<div className="w-full rounded-t-lg bg-almond-200 px-4 py-8">
			<div className="mx-auto flex max-w-4xl items-center justify-between px-4">
				<div>
					<h1 className="mb-2 text-3xl font-bold">{headerText}</h1>
					<p className="text-gray-600">{subText}</p>
				</div>
				<div className="rounded-full bg-white px-5 py-3 font-semibold text-indigo-600">
					<Suspense
						fallback={
							<div className="w-44">
								<LoaderCentered size="sm" />
							</div>
						}
					>
						<TotalBalance userId={userId} />
					</Suspense>
				</div>
			</div>
		</div>
	);
};

const TotalBalance = async ({ userId }: BalanceHeaderProps) => {
	const totalBalance = await getUserTotalBalance(userId);
	return <>Total Balance: {totalBalance.toFixed(2)}€</>;
};
