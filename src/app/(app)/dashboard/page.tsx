import { GroupsPreview } from "@/components/dashboard/groups-preview";
import { Header } from "@/components/dashboard/header";
import { LatestChanges } from "@/components/dashboard/latest-changes";

import { SummaryCards } from "@/components/dashboard/summary-cards";

const Dashboard = () => {
	return (
		<div className="flex min-h-screen w-full flex-col">
			<Header />
			<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
				<SummaryCards />
				<div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
					<GroupsPreview />
					<LatestChanges />
				</div>
			</main>
		</div>
	);
};

export default Dashboard;
