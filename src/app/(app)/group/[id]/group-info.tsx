'use server';

import { type Session } from 'next-auth';
import { UserRoundPlus } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { auth } from '@/auth';

import {
	getGroupName,
	getUserGroupsRelations
} from '../../../../queries/group';
import { getGroupsExpenses } from '../../../../queries/expenses';

import { LeaveGroupButton } from './leave-group-button';

export const GroupInfo = async ({ groupId }: { groupId: string }) => {
	const session: Session | null = await auth();
	const userId = session?.user?.id;
	if (!userId) {
		return;
	}

	const expenses = await getGroupsExpenses(groupId);
	const expensesSum = expenses.reduce(
		(acc, expense) => acc + parseFloat(expense.amount),
		0
	);

	const userGroups = await getUserGroupsRelations(groupId);
	const usersCount = userGroups.length;
	const expensesPerPerson = expensesSum / usersCount;

	const groupName = await getGroupName(groupId);

	return (
		<div className="flex h-full flex-col">
			<div className="flex flex-col md:grid md:grid-cols-2">
				<div className="mb-4 flex flex-col">
					<b className="w-48">Group name</b>
					{groupName}
				</div>
				<div className="mb-4 flex flex-col">
					<b className="w-48">Members</b>
					{userGroups.length === 0 && <p>Empty group</p>}
					{userGroups.map(ug => (
						<p key={ug.id}>here should be ug.user.name</p> // TODO 1 - accesible but null
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
