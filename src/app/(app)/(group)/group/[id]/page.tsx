import { type Metadata } from 'next';
import { Suspense } from 'react';
import { type Session } from 'next-auth';

import { getGroupName } from '@/queries/groups';
import { Skeleton, SkeletonMap } from '@/components/ui/skeleton';
import { GroupName } from '@/components/groups/group-name';
import { GroupInfo } from '@/components/groups/group-info';
import { ExpenseList } from '@/components/groups/expense-list';
import { AddExpense } from '@/components/expense/add-expense';
import { SelectField } from '@/components/expense/select-field';
import { auth } from '@/auth';

import GroupDetail from './group-detail';

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
		<GroupDetail
			id={params.id}
			name={
				<Suspense fallback={<Skeleton className="h-9 w-48 bg-almond-300" />}>
					<GroupName groupId={params.id} />
				</Suspense>
			}
			expenseList={
				<Suspense
					fallback={<SkeletonMap count={5} className="h-9 bg-almond-300" />}
				>
					<ExpenseList id={params.id} />
				</Suspense>
			}
			groupInfo={
				<Suspense fallback={<Skeleton className="h-24 bg-almond-300" />}>
					<GroupInfo groupId={params.id} />
				</Suspense>
			}
			addExpense={addExpense}
		/>
	);
};

export default GroupDetailPage;
