import { Hourglass } from 'lucide-react';

import { ExpenseList } from './expense-list';

const ExpensesPage = () => (
	<div className="mx-4 lg:mx-16">
		<h1 className="flex flex-row rounded-t-lg bg-almond-200 py-4 pl-8 text-lg">
			<Hourglass className="mr-6 mt-0.5" />
			My recent expenses
		</h1>
		<ExpenseList />
	</div>
);

export default ExpensesPage;
