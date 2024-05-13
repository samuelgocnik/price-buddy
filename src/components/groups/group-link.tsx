'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

import { cn } from '@/lib/cn';

type GroupLinkProps = {
	id: string;
	name: string;
};

export const GroupLink = ({ id, name }: GroupLinkProps) => {
	const params = useParams<{ id: string }>();

	const currentOpenedGroupId = params.id;

	return (
		<Link
			className={cn(
				'px-8 py-4 hover:bg-almond-200 hover:font-bold',
				id === currentOpenedGroupId && 'bg-almond-200 font-bold'
			)}
			href={`/group/${id}`}
		>
			{name}
		</Link>
	);
};
