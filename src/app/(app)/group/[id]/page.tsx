import { type Metadata } from 'next';
import { Suspense } from 'react';
import { type Session } from 'next-auth';

import { getGroupName } from '@/queries/groups';
import { AddExpense } from '@/components/expense/add-expense';
import { SelectField } from '@/components/expense/select-field';
import { auth } from '@/auth';

import GroupsPage from '../page';

import { ExpenseList } from './expense-list';
import GroupDetail from './group-detail';
import { GroupInfo } from './group-info';

type GroupDetailPageProps = { params: { id: string } };

export const generateMetadata = async ({
	params
}: GroupDetailPageProps): Promise<Metadata> => {
	const groupName = await getGroupName(params.id);

	return {
		title: `${groupName} - Group detail - PriceBuddy`,
		description: `View and manage details of the group ${groupName} on PriceBuddy. See expenses and group information.`
	};
};

const GroupDetailPage = async ({ params }: GroupDetailPageProps) => {
	const groupName = await getGroupName(params.id);
	const session: Session | null = await auth();

	const userId = session?.user?.id;
	if (!userId) {
		return <p>You must be logged in to view this page.</p>;
	}
	const addExpense = (
		<AddExpense
			selectGroup={
				<Suspense fallback={<div>Loading...</div>}>
					<SelectField
						isCategory={false}
						selectedGroup={params.id}
						userId={userId}
					/>
				</Suspense>
			}
			selectCategory={
				<Suspense fallback={<div>Loading...</div>}>
					<SelectField isCategory userId={userId} />
				</Suspense>
			}
			userId={userId}
			selectedGroup={params.id}
		/>
	);
	return (
		<div>
			<GroupDetail
				id={params.id}
				name={groupName}
				groupsPage={<GroupsPage />}
				expenseList={<ExpenseList id={params.id} />}
				groupInfo={<GroupInfo groupId={params.id} />}
				addExpense={addExpense}
			/>
		</div>
	);
};

export default GroupDetailPage;
