import { type Metadata } from 'next';
import { Suspense } from 'react';

import { getGroupName } from '@/queries/groups';
import { Skeleton } from '@/components/ui/skeleton';
import { GroupName } from '@/components/groups/group-name';
import { GroupInfo } from '@/components/groups/group-info';
import { ExpenseList } from '@/components/groups/expense-list';

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

const GroupDetailPage = async ({ params }: GroupDetailPageProps) => (
	<GroupDetail
		id={params.id}
		name={
			<Suspense fallback={<Skeleton className="h-9 w-24 bg-blue-smoke-200" />}>
				<GroupName groupId={params.id} />
			</Suspense>
		}
		expenseList={
			<Suspense fallback={<Skeleton className="h-9 w-24 bg-blue-smoke-200" />}>
				<ExpenseList id={params.id} />
			</Suspense>
		}
		groupInfo={
			<Suspense
				fallback={<Skeleton className="h-9 w-full bg-blue-smoke-200" />}
			>
				<GroupInfo groupId={params.id} />
			</Suspense>
		}
	/>
);

export default GroupDetailPage;
