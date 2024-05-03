'use server';

import { getExpenses } from '../action';

export const ExpenseList = async ({ id }: { id: string }) => {
	//const expenses = generateMockExpenses(5);
	const allExpenses = await getExpenses();
	const expenses = allExpenses.filter(expense => expense.groupId === id);
	return (
		<div>
			{expenses.map(expense => (
				<div
					key={expense.id}
					className="my-2 flex items-center justify-between"
				>
					<p>{expense.title}</p>
					<p className="mx-32">{expense.paidById}</p>
					<p>{expense.amount}</p>
				</div>
			))}
		</div>
	);
};
