import { Activity, CreditCard, DollarSign, Users } from "lucide-react";

import { GroupsPreview } from "@/components/dashboard/groups-preview";
import { Header } from "@/components/dashboard/header";
import { LatestChanges } from "@/components/dashboard/latest-changes";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const SummaryCards = () => {
	const cardsData = [
		{
			id: 1,
			title: "Total Received",
			icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
			value: "$231.89",
			percentage: "+20.1% from last month",
		},
		{
			id: 2,
			title: "Total Send",
			icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
			value: "$231.89",
			percentage: "+180.1% from last month",
		},
		{
			id: 3,
			title: "You are Owed",
			icon: <CreditCard className="h-4 w-4 text-muted-foreground" />,
			value: "$231.89",
			percentage: "+19% from last month",
		},
		{
			id: 4,
			title: "You Owe",
			icon: <CreditCard className="h-4 w-4 text-muted-foreground" />,
			value: "$231.89",
			percentage: "+201 since last hour",
		},
	];

	return (
		<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
			{cardsData.map((card) => (
				<Card key={card.id}>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">{card.title}</CardTitle>
						{card.icon}
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{card.value}</div>
						<p className="text-xs text-muted-foreground">{card.percentage}</p>
					</CardContent>
				</Card>
			))}
		</div>
	);
};
