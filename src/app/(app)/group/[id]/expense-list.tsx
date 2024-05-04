'use server';

import { getExpenses, getUsers } from '../action';

export const ExpenseList = async ({ id }: { id: string }) => {
	//const expenses = generateMockExpenses(5);
	const allExpenses = await getExpenses();
	const expenses = allExpenses.filter(expense => expense.groupId === id);
	const users = await getUsers();
	return (
		<div>
			{expenses.length === 0 && <p>No expenses</p>}
			{expenses.map(expense => (
				<div
					key={expense.id}
					className="my-2 flex items-center justify-between"
				>
					<p>{expense.title}</p>
					<p className="mx-16">
						{users.filter(u => u.id === expense.paidById)[0].name}
					</p>
					<p>{expense.amount} €</p>
				</div>
			))}
		</div>
	);
};
