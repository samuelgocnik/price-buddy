import { Suspense } from 'react';
import { type Session } from 'next-auth';

import { AddExpense } from '@/components/expense/add-expense';
import { SelectField } from '@/components/expense/select-field';
import { auth } from '@/auth';
import { AddGroup } from '@/components/newGroup/add-group';
import { GroupsPreview } from '@/components/dashboard/groups-preview';
import { LatestChanges } from '@/components/dashboard/latest-changes';
import { UserSummaryCards } from '@/components/dashboard/summary-cards';

const DashboardPage = async () => {
	const session: Session | null = await auth();

	const userId = session?.user?.id;
	if (!userId) {
		return <p>You must be logged in to view this page.</p>;
	}
	const selectedGroup = undefined;

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
