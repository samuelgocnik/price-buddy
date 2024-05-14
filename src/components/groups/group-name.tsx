import { getGroupName } from '@/server-actions/groups';

export const GroupName = async ({ groupId }: { groupId: string }) => {
	const groupName = await getGroupName(groupId);

	return groupName;
};
