'use server';
import { UserRoundPlus } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { getExpenses, getGroups, getUserGroups, getUsers } from '../action';

import { LeaveGroupButton } from './leave-group-button';

export const GroupInfo = async ({ groupId }: { groupId: string }) => {
	const allExpenses = await getExpenses();
	const expenses = allExpenses.filter(expense => expense.groupId === groupId);
	const expensesSum = expenses.reduce(
		(acc, expense) => acc + parseFloat(expense.amount),
		0
	);

	const allUserGroups = await getUserGroups();
	const userGroups = allUserGroups.filter(
		userGroup => userGroup.groupId === groupId
	);
	const usersCount = userGroups.length;
	const expensesPerPerson = expensesSum / usersCount;

	const allUsers = await getUsers();
	const usersInGroup = allUsers.filter(user =>
		userGroups.map(userGroup => userGroup.userId).includes(user.id)
	);

	const allGroups = await getGroups();
	const userId = 'de0b5851-f7cb-4907-b746-28a86aaf9dfe';

	return (
		<div className="flex h-full flex-col">
			<div className="flex flex-col md:grid md:grid-cols-2">
				<div className="mb-4 flex flex-col md:hidden">
					<b className="w-48">Group name</b>
					{allGroups.filter(group => group.id === groupId)[0].name}
				</div>
				<div className="mb-4 flex flex-col">
					<b className="w-48">Members</b>
					{usersInGroup.length === 0 && <p>Empty group</p>}
					{usersInGroup.map(user => (
						<p key={user.id}>{user.name}</p>
					))}
				</div>
				<div className="flex flex-col">
					<b>Total expenses</b>
					<p>{expensesSum} €</p>
					<b className="mt-4">Expenses per person</b>
					<p className="mb-4">{expensesPerPerson ? expensesPerPerson : 0} €</p>
				</div>
			</div>
			<b className="my-2">Add member</b>
			<div className="flex flex-row">
				<Input />
				<Button LeadingIcon={UserRoundPlus} className="ml-2">
					Add
				</Button>
			</div>
			<LeaveGroupButton userId={userId} groupId={groupId} />
		</div>
	);
};
