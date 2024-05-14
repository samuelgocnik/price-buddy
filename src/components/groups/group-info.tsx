'use server';

import { type Session } from 'next-auth';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { auth } from '@/auth';
import { AddUserToGroup } from '@/app/(app)/(group)/group/[id]/add-user-to-group';
import { getGroupsExpenses } from '@/server-actions/expenses';
import { getGroupName, getUserGroupsRelations } from '@/server-actions/groups';

import { AvatarBackgroundFallback } from '../empty-photo';
import { LeaveGroupButton } from '../../app/(app)/(group)/group/[id]/leave-group-button';

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
						<div key={ug.id} className="flex flex-row items-center py-2">
							<Avatar className="mr-4 h-9 w-9">
								<AvatarImage src={ug.user.image ?? undefined} alt="Avatar" />
								<AvatarBackgroundFallback />
							</Avatar>
							<p>{ug.user.name}</p>
						</div>
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
				<AddUserToGroup groupId={groupId} />
			</div>
			<LeaveGroupButton userId={userId} groupId={groupId} />
		</div>
	);
};
