import { type Session } from 'next-auth';
import { Suspense } from 'react';
import { type Metadata } from 'next';

import { auth } from '@/auth';
import { BalanceList } from '@/components/balances/balance-list';
import { BalanceHeader } from '@/components/balances/balance-header';
import { LoaderCentered } from '@/components/ui/loader';

export const metadata: Metadata = {
	title: 'Balances - PriceBuddy',
	description:
		'View and manage your balances with friends on PriceBuddy. Keep track of who owes you and who you owe.'
};

const BalancesPage = async () => {
	const session: Session | null = await auth();

	const userId = session?.user?.id;
	if (!userId) {
		return <p>You must be logged in to view this page.</p>;
	}

	return (
		<div className="rounded-lg bg-almond-100 shadow">
			<div className="flex flex-col items-center">
				<BalanceHeader userId={userId} />
				<div className="w-full max-w-4xl py-5">
					<Suspense fallback={<LoaderCentered size="xl" />}>
						<BalanceList userId={userId} />
					</Suspense>
				</div>
			</div>
		</div>
	);
};

export default BalancesPage;
