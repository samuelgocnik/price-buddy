'use server';
import { type Session } from 'next-auth';
import React from 'react';
import { Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { auth } from '@/auth';
import { getGroups, getUserGroups, getUsersGroups } from '@/queries/group';

import { GroupLink } from './group-link';

const GroupsPage = async ({ activeId }: { activeId: string | null }) => {
	// const allGroups = await getGroups();
	// const userGroups = await getUserGroups();

	const session: Session | null = await auth();
	const userId = session?.user?.id;

	// const groups = allGroups.filter(group =>
	// 	userGroups
	// 		.filter(ug => ug.userId === userId)
	// 		.map(userGroup => userGroup.groupId)
	// 		.includes(group.id)
	// );

	const groups = await getUsersGroups();

	return <div>{groups[2].group.name}</div>;

	return (
		<div className="flex min-h-[calc(100vh-5rem)] w-full flex-col bg-almond-100 md:min-h-[calc(100vh-6rem)]">
			<Button LeadingIcon={Users} className="m-8 w-24">
				New
			</Button>
			{groups.map(group => (
				<GroupLink
					key={group.id}
					id={group.id}
					activeId={activeId}
					name={group.group.name}
				/>
			))}
			{groups.length === 0 && (
				<p className="ml-8">You are not a member of any group.</p>
			)}
		</div>
	);
};

export default GroupsPage;
