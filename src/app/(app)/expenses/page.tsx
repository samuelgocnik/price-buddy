import { Hourglass } from 'lucide-react';
import { Suspense } from 'react';

import Loader from '@/components/ui/loader';

import { ExpenseList } from './expense-list';

const ExpensesPage = () => (
	<div className="overflow-hidden rounded-lg bg-almond-100 shadow">
		<h1 className="flex flex-row bg-almond-200 py-4 pl-8 text-lg">
			<Hourglass className="mr-6 mt-0.5" />
			<span>My recent expenses</span>
		</h1>
		<Suspense
			fallback={
				<div className="flex h-32 items-center justify-center rounded-b-lg bg-almond-100">
					<Loader size="lg" className="text-primary" />
				</div>
			}
		>
			<ExpenseList />
		</Suspense>
	</div>
);

export default ExpensesPage;
