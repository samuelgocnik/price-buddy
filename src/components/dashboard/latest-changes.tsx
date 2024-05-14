import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import d from 'dayjs';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { type ExpensesWithRelations } from '@/db/schema/expenses';
import { getExpensesRecent } from '@/queries/expenses';
import { Button } from '@/components/ui/button';

import { LoaderCentered } from '../ui/loader';
import { AvatarBackgroundFallback } from '../empty-photo';

export type LatestChangesProps = {
	userId: string;
};

export const LatestChanges = ({ userId }: LatestChangesProps) => (
	<Card>
		<CardHeader className="flex flex-row justify-between">
			<CardTitle>Latest Transactions</CardTitle>
			<Button asChild size="sm" className="ml-auto">
				<Link href="/expenses" className="flex">
					View All
					<ArrowUpRight className="ml-1 mt-1 h-4 w-4" />
				</Link>
			</Button>
		</CardHeader>
		<CardContent className="grid gap-8">
			<Suspense fallback={<LoaderCentered size="xl" />}>
				<ExpencesList userId={userId} />
			</Suspense>
		</CardContent>
	</Card>
);

const ExpencesList = async ({ userId }: LatestChangesProps) => {
	const expencesAll: ExpensesWithRelations[] = await getExpensesRecent(
		userId,
		5
	);

	return (
		<>
			{expencesAll.map(expense => (
				<div key={expense.id} className="flex items-center gap-4">
					<Avatar className="hidden h-9 w-9 sm:flex">
						<AvatarImage
							src={expense.paidBy?.image ?? undefined}
							alt="Avatar"
						/>
						<AvatarBackgroundFallback />
					</Avatar>
					<div className="grid gap-1">
						<p className="text-sm font-medium leading-none">
							{expense.paidBy?.name ?? 'Unknown User'}
						</p>
						{/* <p className="text-sm">{expense.paidBy?.email ?? 'Unknown Email'}</p> */}
						<p className="text-sm">
							{d(expense.createdAt).format('DD/MM/YYYY - HH:mm')}
						</p>
					</div>
					<div className="ml-auto font-medium">{expense.amount} €</div>
				</div>
			))}
		</>
	);
};
