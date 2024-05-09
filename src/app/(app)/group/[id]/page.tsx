'use server';

import { getGroupName } from '@/queries/group';

import GroupsPage from '../page';

import { ExpenseList } from './expense-list';
import GroupDetail from './group-detail';
import { GroupInfo } from './group-info';

const GroupDetailPage = async ({ params }: { params: { id: string } }) => {
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
