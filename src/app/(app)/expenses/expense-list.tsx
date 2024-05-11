'use server';

import { type Session } from 'next-auth';

import { getUsersExpenes } from '@/queries/expenses';
import { auth } from '@/auth';

export const ExpenseList = async () => {
	const session: Session | null = await auth();
	const userId = session?.user?.id;
	if (!userId) {
		return;
	}
	const expenses = await getUsersExpenes(userId);
	return (
		<div className="bg-almond-100 p-8">
			<div className="mb-4 grid grid-cols-4">
				<b className="my-auto">Expense</b>
				<b className="my-auto">Group</b>
				<b className="my-auto">Paid by</b>
				<b className="my-auto mr-2 text-right">Total amount</b>
			</div>
			{expenses.map(expense => (
				<div key={expense.id} className="my-2 grid grid-cols-4">
					<p className="my-auto">{expense.title}</p>
					<p className="my-auto">{expense.group.name}</p>
					<p className="my-auto">{expense.paidBy.name}</p>
					<p className="my-auto mr-2 text-right">{expense.amount} €</p>
				</div>
			))}
		</div>
	);
};
