'use client';

import { UsersIcon } from 'lucide-react';
import { useParams, usePathname } from 'next/navigation';

import { useIsBreakpoint } from '@/lib/hooks/use-is-breakpoint';
import { cn } from '@/lib/cn';
import { type UsersGroups } from '@/db/schema/userGroups';
import { type Groups } from '@/db/schema/groups';

import { Button } from '../ui/button';

import { GroupLink } from './group-link';

type GroupsListProps = {
	groups: Array<
		UsersGroups & {
			group: Groups;
		}
	>;
};

export const GroupsList = ({ groups }: GroupsListProps) => {
	const pathname = usePathname();
	const params = useParams<{ id: string }>();
	const isMobile = useIsBreakpoint('md');

	const isGroupPage = pathname === '/group';

	const hideList = isMobile && !isGroupPage;

	const hasGroups = groups.length > 0;

	return (
		// On initial load (fresh load of the page, eg /groups/2) this throws hydratation error
		<div className={cn('flex h-full flex-col', hideList && 'hidden')}>
			{!hasGroups ? (
				<div className="space-y-4 p-8 text-center">
					<p>You are not a member of any group.</p>
					<Button LeadingIcon={UsersIcon} className="md:w-1/3">
						New group
					</Button>
				</div>
			) : (
				<>
					<div className="m-8">
						<Button LeadingIcon={UsersIcon} className="mx-auto">
							New group
						</Button>
					</div>
					<ul className="h-full space-y-1 overflow-y-auto">
						{groups.map(group => (
							<li key={`group-${group.id}`}>
								<GroupLink
									id={group.id}
									name={group.group.name}
									activeGroupId={params.id}
								/>
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
};
