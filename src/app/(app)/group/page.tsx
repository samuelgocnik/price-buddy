import { type Session } from 'next-auth';
import React from 'react';
import { Users } from 'lucide-react';
import { type Metadata } from 'next';

import { Button } from '@/components/ui/button';
import { auth } from '@/auth';
import { getUsersGroups } from '@/queries/groups';

import { GroupLink } from '../../../components/groups/group-link';

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

	return (
		<div>
			{groups.length === 0 ? (
				<div className="mx-auto mt-16 flex flex-col items-center rounded-lg bg-almond-100 p-8 shadow">
					<p>You are not a member of any group.</p>
					<Button LeadingIcon={Users} className="mt-8 w-24">
						New
					</Button>
				</div>
			) : (
				<div className="flex min-h-[calc(100vh-5rem)] w-full flex-col rounded-lg bg-almond-100 shadow md:min-h-[calc(100vh-6rem)] md:rounded-none md:rounded-l-lg">
					<Button LeadingIcon={Users} className="m-8 w-24">
						New
					</Button>
					{groups.map(group => (
						<GroupLink
							key={group.id}
							id={group.id}
							activeId={null}
							name={group.group.name}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default GroupsPage;
