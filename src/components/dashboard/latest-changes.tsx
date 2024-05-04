import { Suspense } from 'react';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type ExpensesWithRelations } from '@/db/schema/expenses';
import { getExpensesRecent } from '@/queries/expenses';

import { LoaderCentered } from '../ui/loader';
import { AvatarBackgroundFallback } from '../empty-photo';

export const LatestChanges = () => (
	<Card>
		<CardHeader>
			<CardTitle>Recent Transactions</CardTitle>
		</CardHeader>
		<CardContent className="grid gap-8">
			<Suspense fallback={<LoaderCentered size="xl" />}>
				<ExpencesList />
			</Suspense>
		</CardContent>
	</Card>
);

const ExpencesList = async () => {
	const expencesAll: ExpensesWithRelations[] = await getExpensesRecent(5);

	return (
		<>
			{expencesAll.map(data => (
				<div key={data.id} className="flex items-center gap-4">
					<Avatar className="hidden h-9 w-9 sm:flex">
						<AvatarImage src={data.paidBy.image ?? undefined} alt="Avatar" />
						<AvatarBackgroundFallback />
					</Avatar>
					<div className="grid gap-1">
						<p className="text-sm font-medium leading-none">
							{data.paidBy.name}
						</p>
						<p className="text-sm">{data.paidBy.email}</p>
					</div>
					<div className="ml-auto font-medium">{data.amount}</div>
				</div>
			))}
		</>
	);
};
