import { type Session } from 'next-auth';
import { type PropsWithChildren } from 'react';

import { auth } from '@/auth';
import { GroupsList } from '@/components/groups/group-list';
import { cn } from '@/lib/cn';
import { getUsersGroups } from '@/server-actions/groups';

const GroupLayout = async ({ children }: PropsWithChildren) => {
	const session: Session | null = await auth();
	const userId = session?.user?.id;

	if (!userId) {
		return;
	}
	const groups = await getUsersGroups(userId);

	const hasGroups = groups.length > 0;

	return (
		<div
			className={cn(
				'h-full max-h-full flex-1 overflow-y-auto rounded-lg bg-almond-100 shadow',
				hasGroups && 'md:grid md:grid-cols-[1fr_2fr]'
			)}
		>
			<aside className="overflow-y-auto">
				<GroupsList groups={groups} userId={userId} />
			</aside>
			<section className="overflow-y-auto">{children}</section>
		</div>
	);
};

export default GroupLayout;
