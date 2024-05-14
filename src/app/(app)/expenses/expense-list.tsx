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

	if (expenses.length === 0) {
		return <div className="p-8">You have no expenses...</div>;
	}

	return (
		<table className="w-full py-8">
			<thead>
				<tr className="mb-4 border-b border-primary pb-4">
					<th className="px-6 py-4 text-left">Expense</th>
					<th className="px-6 py-4 text-left">Group</th>
					<th className="px-6 py-4 text-left max-md:hidden">Category</th>
					<th className="px-6 py-4 text-left max-md:hidden">Paid by</th>
					<th className="px-6 py-4 text-left">Total amount</th>
				</tr>
			</thead>
			<tbody>
				{expenses.map(expense => (
					<tr key={expense.id}>
						<td className="px-6 py-3">{expense.title}</td>
						<td className="px-6 py-3">
							<Link
								className="block rounded-md bg-almond-200 p-1 hover:shadow-md"
								href={`/group/${expense.group.id}`}
							>
								{expense.group.name}
							</Link>
						</td>
						<td className="px-6 py-3 max-md:hidden">{expense.category.name}</td>
						<td className="px-6 py-3 max-md:hidden">
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
						<td className="px-6 py-3">{expense.amount} €</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
