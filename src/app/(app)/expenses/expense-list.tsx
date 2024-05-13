'use server';

import Link from 'next/link';
import { type Session } from 'next-auth';

import { getUsersExpenes } from '@/queries/expenses';
import { auth } from '@/auth';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { AvatarBackgroundFallback } from '@/components/empty-photo';

export const ExpenseList = async () => {
	const session: Session | null = await auth();
	const userName = session?.user?.name;
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
					<th className="hidden py-4 pl-4 text-left md:table-cell">Category</th>
					<th className="hidden py-4 pl-4 text-left md:table-cell">Paid by</th>
					<th className="py-4 pl-4 text-left">Total amount</th>
				</tr>
			</thead>
			<tbody>
				{expenses.map(expense => (
					<tr key={expense.id}>
						<td className="py-2 pl-8">{expense.title}</td>
						<td className="py-2 pl-4">
							<Link
								className="rounded-md bg-almond-200 p-1 hover:shadow-md"
								href={`/group/${expense.group.id}`}
							>
								{expense.group.name}
							</Link>
						</td>
						<td className="hidden py-2 pl-4 md:table-cell">
							{expense.category.name}
						</td>
						<td className="hidden py-2 pl-4 md:table-cell">
							<div className="flex flex-row">
								<Avatar className="my-auto mr-2 block h-6 w-6">
									<AvatarImage
										src={expense.paidBy.image ?? undefined}
										alt="Avatar"
									/>
									<AvatarBackgroundFallback />
								</Avatar>
								{userName === expense.paidBy.name ? 'Me' : expense.paidBy.name}
							</div>
						</td>
						<td className="py-2 pl-4">{expense.amount} €</td>
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
