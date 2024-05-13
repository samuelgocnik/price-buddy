import { type Session } from 'next-auth';
import { type Metadata } from 'next';

import { auth } from '@/auth';
import { getUsersGroups } from '@/queries/groups';
import { GroupLink } from '@/components/groups/group-link';
import { AddGroup } from '@/components/newGroup/add-group';

export const metadata: Metadata = {
	title: 'My groups - PriceBuddy',
	description:
		'View and manage your groups on PriceBuddy. Share expenses and settle up with your friends.'
};

const GroupsPage = async () => {
	const session: Session | null = await auth();
	const userId = session?.user?.id;

	if (!userId) {
		return;
	}
	const groups = await getUsersGroups(userId);

	return (
		<div>
			{groups.length === 0 ? (
				<div className="mx-auto mt-16 flex flex-col items-center rounded-lg bg-almond-100 p-8 shadow">
					<p>You are not a member of any group.</p>
					<AddGroup userId={userId} />
				</div>
			) : (
				<div className="flex min-h-[calc(100vh-5rem)] w-full flex-col rounded-lg bg-almond-100 shadow md:min-h-[calc(100vh-6rem)] md:rounded-none md:rounded-l-lg">
					<AddGroup userId={userId} />
					{groups.map(group => (
						<GroupLink
							key={group.group.id}
							id={group.group.id}
							name={group.group.name}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default GroupsPage;
