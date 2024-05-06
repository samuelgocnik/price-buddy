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
				<div key={expense.id} className="my-2 grid grid-cols-3">
					<p>{expense.title}</p>
					<p>{users.filter(u => u.id === expense.paidById)[0].name}</p>
					<p className="text-right">{expense.amount} €</p>
				</div>
			))}
		</div>
	);
};
