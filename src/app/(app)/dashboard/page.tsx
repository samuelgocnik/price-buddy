import { type Session } from 'next-auth';

import { GroupsPreview } from '@/components/dashboard/groups-preview';
import { LatestChanges } from '@/components/dashboard/latest-changes';
import { UserSummaryCards } from '@/components/dashboard/summary-cards';
import { auth } from '@/auth';

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
				<GroupsPreview />
				<LatestChanges />
			</div>
		</div>
	);
};

export default DashboardPage;
