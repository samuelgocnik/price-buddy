'use server';

import { type Session } from 'next-auth';
import React from 'react';
import { Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { auth } from '@/auth';
import { getUsersGroups } from '@/queries/group';

import { GroupLink } from './group-link';

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
				<div className="mx-auto mt-16 flex flex-col items-center rounded-lg bg-almond-100 p-8">
					<p>You are not a member of any group.</p>
					<Button LeadingIcon={Users} className="mt-8 w-24">
						New
					</Button>
				</div>
			) : (
				<div className="flex min-h-[calc(100vh-5rem)] w-full flex-col bg-almond-100 md:min-h-[calc(100vh-6rem)]">
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
