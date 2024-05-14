import Link from 'next/link';

import { cn } from '@/lib/cn';

type GroupLinkProps = {
	id: string;
	name: string;
	activeGroupId: string;
};

export const GroupLink = ({ id, name, activeGroupId }: GroupLinkProps) => (
	<Link
		className={cn(
			'block px-8 py-4 hover:bg-almond-200/65 md:rounded-l-lg',
			id === activeGroupId && 'bg-almond-200 font-bold hover:bg-almond-200'
		)}
		href={`/group/${id}`}
	>
		{name}
	</Link>
);
