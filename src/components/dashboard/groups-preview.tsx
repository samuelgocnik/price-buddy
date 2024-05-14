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
import { AvatarBackground } from '../empty-photo';

export type GroupsPreviewProps = {
	userId: string;
};

export const GroupsPreview = ({ userId }: GroupsPreviewProps) => (
	<Card>
		<CardHeader className="flex flex-row justify-between">
			<div className="grid gap-2">
				<CardTitle>Groups</CardTitle>
				<CardDescription>Recent active groups</CardDescription>
			</div>
			<Button asChild size="sm" className="ml-auto">
				<Link href="/group" className="flex">
					View All
					<ArrowUpRight className="ml-1 mt-0.5 h-5 w-5" />
				</Link>
			</Button>
		</CardHeader>
		<CardContent>
			<Suspense fallback={<LoaderCentered size="xl" />}>
				<GroupList userId={userId} />
			</Suspense>
		</CardContent>
	</Card>
);

const GroupList = async ({ userId }: GroupsPreviewProps) => {
	const groups: Groups[] = await getGroupsPreview(userId);
	console.log('groups', groups);

	return (
		<ul className="grid gap-4">
			{groups.map(group => (
				<li key={group.id}>
					<Link
						href={`/group/${group.id}`}
						className="inline-flex items-center gap-4"
					>
						<AvatarBackground>
							{group.photoUrl && (
								<Image
									src={group.photoUrl}
									alt="Group Picture"
									width={10}
									height={10}
									className="h-full w-full rounded-full"
								/>
							)}
						</AvatarBackground>
						{group.name}
					</Link>
				</li>
			))}
		</ul>
	);
};
