import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const LatestChanges = () => {
	// Sample data for recent sales
	const recentSales = [
		{
			id: 1,
			avatarSrc: "/avatars/01.png",
			avatarFallback: "OM",
			name: "Olivia Martin",
			email: "olivia.martin@email.com",
			amount: "+$1,999.00",
		},
		{
			id: 2,
			avatarSrc: "/avatars/02.png",
			avatarFallback: "JL",
			name: "Jackson Lee",
			email: "jackson.lee@email.com",
			amount: "+$39.00",
		},
		{
			id: 3,
			avatarSrc: "/avatars/03.png",
			avatarFallback: "IN",
			name: "Isabella Nguyen",
			email: "isabella.nguyen@email.com",
			amount: "+$299.00",
		},
		{
			id: 4,
			avatarSrc: "/avatars/04.png",
			avatarFallback: "WK",
			name: "William Kim",
			email: "will@email.com",
			amount: "+$99.00",
		},
		{
			id: 5,
			avatarSrc: "/avatars/05.png",
			avatarFallback: "SD",
			name: "Sofia Davis",
			email: "sofia.davis@email.com",
			amount: "+$39.00",
		},
	];

	return (
		<Card x-chunk="dashboard-01-chunk-5">
			<CardHeader>
				<CardTitle>Recent Transactions</CardTitle>
			</CardHeader>
			<CardContent className="grid gap-8">
				{recentSales.map((sale) => (
					<div key={sale.id} className="flex items-center gap-4">
						<Avatar className="hidden h-9 w-9 sm:flex">
							<AvatarImage src={sale.avatarSrc} alt="Avatar" />
							<AvatarFallback>{sale.avatarFallback}</AvatarFallback>
						</Avatar>
						<div className="grid gap-1">
							<p className="text-sm font-medium leading-none">{sale.name}</p>
							<p className="text-sm text-muted-foreground">{sale.email}</p>
						</div>
						<div className="ml-auto font-medium">{sale.amount}</div>
					</div>
				))}
			</CardContent>
		</Card>
	);
};
