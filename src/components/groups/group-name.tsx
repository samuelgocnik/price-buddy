import { getGroupName } from '@/queries/groups';

export const GroupName = async ({ groupId }: { groupId: string }) => {
	const groupName = await getGroupName(groupId);

	return groupName;
};
