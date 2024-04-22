import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export const GroupsPreview = () => {
	return (
		<Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
			<CardHeader className="flex flex-row items-center">
				<div className="grid gap-2">
					<CardTitle>Groups</CardTitle>
					<CardDescription>Recent active groups</CardDescription>
				</div>
				<Button asChild size="sm" className="ml-auto gap-1">
					<Link href="#">
						View All
						<ArrowUpRight className="h-4 w-4" />
					</Link>
				</Button>
			</CardHeader>
			<CardContent>
				<ul className="grid gap-4">
					<li className="flex items-center gap-4">Group 1</li>
					<li className="flex items-center gap-4">Group 2</li>
					<li className="flex items-center gap-4">Group 3</li>
				</ul>
			</CardContent>
		</Card>
	);
};
