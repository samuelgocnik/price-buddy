import GroupsPage from '../page';

import { ExpenseList } from './expense-list';
import GroupDetail from './group-detail';
import { GroupInfo } from './group-info';

const GroupDetailPage = ({ params }: { params: { id: string } }) => (
	<div>
		<GroupDetail
			id={params.id}
			groupsPage={<GroupsPage />}
			expenseList={<ExpenseList id={params.id} />}
			groupInfo={<GroupInfo groupId={params.id} />}
		/>
	</div>
);

export default GroupDetailPage;
