'use server';
import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { getGroupsExpenses } from '@/queries/expenses';

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
					<Button variant="destructive" className="my-auto ml-auto h-8 w-16">
						<Trash2 size={15} />
					</Button>
				</div>
			))}
		</div>
	);
};
