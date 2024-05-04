import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card';
import { type Groups } from '@/db/schema/groups';
import { getGroupsPreview } from '@/queries/groups';

import { LoaderCentered } from '../ui/loader';

export const GroupsPreview = () => (
	<Card className="xl:col-span-2">
		<CardHeader className="flex flex-row justify-between">
			<div className="grid gap-2">
				<CardTitle>Groups</CardTitle>
				<CardDescription>Recent active groups</CardDescription>
			</div>
			<Button asChild size="sm" className="ml-auto">
				<Link href="/group" className="flex">
					View All
					<ArrowUpRight className="ml-1 mt-1 h-4 w-4" />
				</Link>
			</Button>
		</CardHeader>
		<CardContent>
			<Suspense fallback={<LoaderCentered size="xl" />}>
				<GroupList />
			</Suspense>
		</CardContent>
	</Card>
);

const GroupList = async () => {
	const groups: Groups[] = await getGroupsPreview();

	return (
		<ul className="grid gap-4">
			{groups.map(group => (
				<li key={group.id} className="flex items-center gap-4">
					<div
						id="group-picture"
						className="h-10 w-10 rounded-full bg-gray-200"
					>
						{group.photoUrl && (
							<Image
								src={group.photoUrl}
								alt="Group Picture"
								width={10}
								height={10}
								className="h-full w-full rounded-full"
							/>
						)}
					</div>
					{group.name}
				</li>
			))}
		</ul>
	);
};
