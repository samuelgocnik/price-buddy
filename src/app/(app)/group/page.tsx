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
		<div>
			<div className="flex h-[calc(100vh-5rem)] w-full flex-col bg-almond-100 md:h-[calc(100vh-6rem)] md:w-64">
				{groups.map(group => (
					<GroupLink
						key={group.id}
						id={group.id}
						activeId={activeId}
						name={group.name}
					/>
				))}
				<Button LeadingIcon={Users} className="fixed bottom-8 ml-8 w-24">
					New
				</Button>
			</div>
		</div>
	);
};

export default GroupsPage;
