'use client';

import Link from 'next/link';

export const GroupLink = ({
	id,
	activeId,
	name
}: {
	id: string;
	activeId: string | null;
	name: string;
}) => (
	<Link
		className={`px-8 py-4 hover:font-bold ${id === activeId ? 'bg-almond-200 font-bold' : ''}`}
		href={`/group/${id}`}
	>
		{name}
	</Link>
);
