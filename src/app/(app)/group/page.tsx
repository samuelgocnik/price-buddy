'use server';

import React from 'react';

import { getGroups } from './action';
import { GroupLink } from './group-link';

const GroupsPage = async ({ activeId }: { activeId: string | null }) => {
	const groups = await getGroups();
	return (
		<div>
			<div className="flex min-w-64 max-w-2xl flex-col bg-almond-100">
				{groups.map(group => (
					<GroupLink
						key={group.id}
						id={group.id}
						activeId={activeId}
						name={group.name}
					/>
				))}
			</div>
		</div>
	);
};

export default GroupsPage;
