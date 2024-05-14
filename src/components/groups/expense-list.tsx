'use server';

import { getGroupsExpenses } from '@/queries/expenses';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

import { AvatarBackgroundFallback } from '../empty-photo';
import { DeleteExpenseButton } from '../../app/(app)/(group)/group/[id]/delete-expense-button';

export const ExpenseList = async ({ id }: { id: string }) => {
	const expenses = await getGroupsExpenses(id);

	return (
		<div>
			{expenses.length === 0 && <p>No expenses</p>}
			{expenses.map(expense => (
				<div key={expense.id} className="my-2 grid grid-cols-4">
					<p className="my-auto">{expense.title}</p>
					<div>
						<p className="my-auto hidden text-center md:block">
							{expense.paidBy.name}
						</p>
						<div>
							<Avatar className="m-auto my-1 block h-6 w-6 md:hidden">
								<AvatarImage
									src={expense.paidBy.image ?? undefined}
									alt="Avatar"
								/>
								<AvatarBackgroundFallback />
							</Avatar>
						</div>
					</div>
					<p className="my-auto mr-2 text-right">{expense.amount} €</p>
					<DeleteExpenseButton expenseId={expense.id} />
				</div>
			))}
		</div>
	);
};
