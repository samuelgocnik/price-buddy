import { type BalancesWithUsers } from '@/db/schema/userBalances';
import { getAllBalances } from '@/server-actions/balance';

export type BalanceListProps = {
	userId: string;
};

export const BalanceList = async ({ userId }: BalanceListProps) => {
	const balances: BalancesWithUsers[] = await getAllBalances(userId);

	return (
		<div className="flex items-center justify-center p-8">
			<div className="w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-lg">
				{balances.map(balance => (
					<BalanceItem key={balance.id} balanceWithUsers={balance} />
				))}
			</div>
		</div>
	);
};

type BalanceItemProps = {
	balanceWithUsers: BalancesWithUsers;
};

const BalanceItem = ({ balanceWithUsers }: BalanceItemProps) => {
	const { balance, user2 } = balanceWithUsers;
	if (!user2) {
		return <div>User not found</div>;
	}

	let balanceValue = Number.parseFloat(balance);
	if (Number.isNaN(balanceValue)) {
		balanceValue = 0.0;
	}

	// Balance between users:
	// balance > 0  -> user1 owes user2
	// balance < 0  -> user2 owes user1
	const meInDepth = balanceValue >= 0;

	const friendName =
		user2.firstName !== null && user2.lastName !== null
			? `${user2.firstName} ${user2.lastName}`
			: user2.name;
	console.log('Friend name:', friendName);
	const amount: string = `${(-1 * balanceValue).toFixed(2)}€`;

	return (
		<div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 last:border-b-0">
			<div className="flex-1">
				<div className="text-lg font-semibold">{friendName}</div>
				<div className="text-sm text-gray-500">{user2.email ?? ''}</div>
			</div>
			<div className="flex-1 text-right">
				<div
					className={`text-lg font-bold ${
						meInDepth ? 'text-red-600' : 'text-green-600'
					}`}
				>
					{amount}
				</div>
				<div className="text-sm text-gray-500">
					{meInDepth ? 'You are in depth' : 'You are owed'}
				</div>
			</div>
		</div>
	);
};
