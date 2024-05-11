'use server';

import { getGroupsExpenses } from '@/queries/expenses';

import { DeleteExpenseButton } from './delete-expense-button';

export const ExpenseList = async ({ id }: { id: string }) => {
	const expenses = await getGroupsExpenses(id);

	return (
		<div>
			{expenses.length === 0 && <p>No expenses</p>}
			{expenses.map(expense => (
				<div key={expense.id} className="my-2 grid grid-cols-4">
					<p className="my-auto">{expense.title}</p>
					<p className="my-auto text-center">{expense.paidBy.name}</p>
					<p className="my-auto mr-2 text-right">{expense.amount} €</p>
					<DeleteExpenseButton expenseId={expense.id} />
				</div>
			))}
		</div>
	);
};
