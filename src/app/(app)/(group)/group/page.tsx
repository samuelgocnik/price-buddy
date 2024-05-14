import { type Session } from 'next-auth';
import { type Metadata } from 'next';

import { auth } from '@/auth';
import { RedirectToGroupDetail } from '@/components/groups/redirect-to-group-detail';
import { getUsersGroups } from '@/server-actions/groups';

export const metadata: Metadata = {
	title: 'My groups - PriceBuddy',
	description:
		'View and manage your groups on PriceBuddy. Share expenses and settle up with your friends.'
};

const GroupsPage = async () => {
	const session: Session | null = await auth();
	const userId = session?.user?.id;

	if (!userId) {
		return;
	}

	const groups = await getUsersGroups(userId);

	if (groups.length === 0) {
		return;
	}

	return <RedirectToGroupDetail groupId={groups[0].group.id} />;
};

export default GroupsPage;
