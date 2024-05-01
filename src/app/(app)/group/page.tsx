'use client';

import React from 'react';

import { generateMockGroups } from './mocked-data';
import { redirectToGroup } from './action';

const GroupLink = ({
	id,
	activeId,
	name
}: {
	id: number;
	activeId: number | null;
	name: string;
}) => {
	const handleClick = () => {
		redirectToGroup({ id });
	};

	return (
		<button
			className={`px-8 py-4 hover:font-bold ${id === activeId ? 'bg-almond-200 font-bold' : ''}`}
			onClick={handleClick}
		>
			<p className="text-left">{name}</p>
		</button>
	);
};

const GroupsPage = ({ activeId }: { activeId: number | null }) => {
	const groups = generateMockGroups(5);
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
