'use server';
import { Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { getGroupsExpenses } from '@/queries/expenses';

import { getUsers } from '../../../../queries/group';

export const ExpenseList = async ({ id }: { id: string }) => {
	const expenses = await getGroupsExpenses(id);

	// TODO 3 - can be removed after resolving td 2
	const users = await getUsers();
	return (
		<div>
			{expenses.length === 0 && <p>No expenses</p>}
			{expenses.map(expense => (
				<div key={expense.id} className="my-2 grid grid-cols-4">
					<p className="my-auto">{expense.title}</p>
					<p className="my-auto text-center">
						{users.filter(u => u.id === expense.paidById)[0].name}
					</p>
					<p className="my-auto mr-2 text-right">{expense.amount} €</p>
					<Button variant="destructive" className="my-auto ml-auto h-8 w-16">
						<Trash2 size={15} />
					</Button>
				</div>
			))}
		</div>
	);
};
