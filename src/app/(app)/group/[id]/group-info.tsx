'use server';

import { getExpenses, getUserGroups, leaveGroupAction } from '../action';

export const GroupInfo = async ({ id }: { id: string }) => {
	//const expenses = generateMockExpenses(5);
	const allExpenses = await getExpenses();
	const expenses = allExpenses.filter(expense => expense.groupId === id);
	const expensesSum = expenses.reduce(
		(acc, expense) => acc + parseFloat(expense.amount),
		0
	);

	const allUserGroups = await getUserGroups();
	const userGroups = allUserGroups.filter(
		userGroup => userGroup.groupId === id
	);
	const usersCount = userGroups.length;
	const expensesPerPerson = expensesSum / usersCount;

	return (
		<div className="flex flex-col">
			<div className="flex flex-row">
				<div className="flex flex-col">
					<p className="w-3/6">Members</p>
					{userGroups.map(userGroup => (
						<p key={userGroup.id} className="w-3/6">
							{userGroup.id}
						</p>
					))}
				</div>
				<div className="flex flex-col">
					<b>Total expenses</b>
					<p>{expensesSum}</p>
					<b>Expenses per person</b>
					<p>{expensesPerPerson}</p>
				</div>
			</div>
			<p className="my-2">Add member</p>
			<p>leave group</p>
		</div>
	);
};
