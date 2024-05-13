import { type Session } from 'next-auth';
import { type Metadata } from 'next';

import { auth } from '@/auth';
import { GroupsPreview } from '@/components/dashboard/groups-preview';
import { LatestChanges } from '@/components/dashboard/latest-changes';
import { UserSummaryCards } from '@/components/dashboard/summary-cards';

export const metadata: Metadata = {
	title: 'Dashboard - PriceBuddy',
	description:
		'Access your summary cards, group previews, and latest changes on your PriceBuddy dashboard.'
};

const DashboardPage = async () => {
	const session: Session | null = await auth();

	const userId = session?.user?.id;
	if (!userId) {
		return <p>You must be logged in to view this page.</p>;
	}

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
			<UserSummaryCards userId={userId} />

			<div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
				<GroupsPreview userId={userId} />
				<LatestChanges userId={userId} />
			</div>
		</div>
	);
};

export default DashboardPage;
