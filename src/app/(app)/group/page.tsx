'use server';

import React from 'react';
import { Users } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { getGroups, getUserGroups } from './action';
import { GroupLink } from './group-link';

const GroupsPage = async ({ activeId }: { activeId: string | null }) => {
	const allGroups = await getGroups();
	const userGroups = await getUserGroups();
	// TODO: fetch user id from session
	const userId = 'de0b5851-f7cb-4907-b746-28a86aaf9dfe';
	const groups = allGroups.filter(group =>
		userGroups
			.filter(ug => ug.userId === userId)
			.map(userGroup => userGroup.groupId)
			.includes(group.id)
	);
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
					name={group.name}
				/>
			))}
			{groups.length === 0 && <p>You are not a member of any group.</p>}
		</div>
	);
};

export default GroupsPage;
