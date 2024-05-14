import { Hourglass } from 'lucide-react';
import { Suspense } from 'react';
import { type Metadata } from 'next';

import Loader from '@/components/ui/loader';

import { ExpenseList } from './expense-list';

export const metadata: Metadata = {
	title: 'Expenses - PriceBuddy',
	description:
		'View and manage your recent expenses on PriceBuddy. Keep track of your spending.'
};

const ExpensesPage = () => (
	<div className="overflow-hidden rounded-lg bg-almond-100 shadow">
		<h1 className="flex flex-row items-center space-x-4 bg-almond-200 px-8 py-4 text-lg">
			<Hourglass />
			<span className="font-bold">My recent expenses</span>
		</h1>
		<Suspense
			fallback={
				<div className="flex h-32 items-center justify-center">
					<Loader size="lg" className="text-primary" />
				</div>
			}
		>
			<ExpenseList />
		</Suspense>
	</div>
);

export default ExpensesPage;
