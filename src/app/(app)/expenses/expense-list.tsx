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
	return expenses.length !== 0 ? (
		<table className="w-full rounded-b-lg bg-almond-100 py-8">
			<thead>
				<tr className="mb-4 border-b border-black pb-4">
					<th className="py-4 pl-8 text-left">Expense</th>
					<th className="py-4 pl-4 text-left">Group</th>
					<th className="py-4 pl-16 text-left">Paid by</th>
					<th className="py-4 text-left">Total amount</th>
				</tr>
			</thead>
			<tbody>
				{expenses.map(expense => (
					<tr key={expense.id}>
						<td className="py-2 pl-8">{expense.title}</td>
						<td className="py-2 pl-4">{expense.group.name}</td>
						<td className="py-2 pl-16">{expense.paidBy.name}</td>
						<td className="py-2">{expense.amount} €</td>
					</tr>
				))}
			</tbody>
		</table>
	) : (
		<div className="rounded-b-lg bg-almond-100 p-8">
			You have no expenses...
		</div>
	);
};
