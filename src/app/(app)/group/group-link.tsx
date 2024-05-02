'use client';

import { redirectToGroup } from './action';

export const GroupLink = ({
	id,
	activeId,
	name
}: {
	id: string;
	activeId: string | null;
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
