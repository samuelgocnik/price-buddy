'use server';

import {
	getExpenses,
	getUserGroups,
	getUsers,
	leaveGroupAction
} from '../action';

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

	const allUsers = await getUsers();
	const usersInGroup = allUsers.filter(user =>
		userGroups.map(userGroup => userGroup.userId).includes(user.id)
	);

	return (
		<div className="flex flex-col">
			<div className="flex flex-row">
				<div className="flex flex-col">
					<b className="w-48">Members</b>
					{usersInGroup.map(user => (
						<p key={user.id}>{user.name}</p>
					))}
				</div>
				<div className="flex flex-col">
					<b>Total expenses</b>
					<p>{expensesSum}</p>
					<b className="mt-4">Expenses per person</b>
					<p className="mb-4">{expensesPerPerson}</p>
				</div>
			</div>
			<p className="my-2">Add member</p>
			<p>leave group</p>
		</div>
	);
};
