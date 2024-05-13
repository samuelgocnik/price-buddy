import { type Metadata } from 'next';

import { getGroupName } from '@/queries/groups';

import GroupsPage from '../page';

import { ExpenseList } from './expense-list';
import GroupDetail from './group-detail';
import { GroupInfo } from './group-info';

type Props = { params: { id: string } };

export const generateMetadata = async ({
	params
}: Props): Promise<Metadata> => {
	const groupName = await getGroupName(params.id);

	return {
		title: `${groupName} - Group detail - PriceBuddy`,
		description: `View and manage details of the group ${groupName} on PriceBuddy. See expenses and group information.`
	};
};

const GroupDetailPage = async ({ params }: Props) => {
	const groupName = await getGroupName(params.id);
	return (
		<div>
			<GroupDetail
				id={params.id}
				name={groupName}
				groupsPage={<GroupsPage />}
				expenseList={<ExpenseList id={params.id} />}
				groupInfo={<GroupInfo groupId={params.id} />}
			/>
		</div>
	);
};

export default GroupDetailPage;
