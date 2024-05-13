import { Hourglass } from 'lucide-react';
import { Suspense } from 'react';

import { ExpenseList } from './expense-list';

const ExpensesPage = () => (
	<div>
		<h1 className="flex flex-row rounded-t-lg bg-almond-200 py-4 pl-8 text-lg">
			<Hourglass className="mr-6 mt-0.5" />
			My recent expenses
		</h1>
		<Suspense
			fallback={
				<div className="flex h-32 items-center justify-center rounded-b-lg bg-almond-100">
					Loading...
				</div>
			}
		>
			<ExpenseList />
		</Suspense>
	</div>
);

export default ExpensesPage;
