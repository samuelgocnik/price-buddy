'use client';

import { LogOut } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useLeaveGroup } from '@/mutations/groups';

export const LeaveGroupButton = ({
	userId,
	groupId
}: {
	userId: string;
	groupId: string;
}) => {
	const { mutate, isPending } = useLeaveGroup();
	return (
		<div>
			<Button
				TrailingIcon={LogOut}
				className="mt-9 border-none text-red-800 hover:bg-destructive/20 hover:text-red-800"
				variant="ghost"
				onClick={() => {
					mutate({ userId, groupId });
				}}
				disabled={isPending}
			>
				{isPending ? 'Leaving group...' : 'Leave group'}
			</Button>
		</div>
	);
};
