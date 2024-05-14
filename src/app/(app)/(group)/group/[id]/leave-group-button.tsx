'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/lib/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { leaveGroupAction } from '@/queries/groups';

type LeaveGroupMutationParams = {
	userId: string;
	groupId: string;
};

// TODO: move to queries folder after everything is done
const useLeaveGroupMutation = () => {
	const r = useRouter();
	const { toast } = useToast();

	return useMutation<void, Error, LeaveGroupMutationParams>({
		mutationFn: leaveGroupAction,
		onSuccess: () => {
			toast({ title: 'Group left!' });
			r.push('/group');
		},
		onError: error => {
			toast({
				title: 'Failed to leave group',
				description: error.message,
				variant: 'destructive'
			});
		}
	});
};

export const LeaveGroupButton = ({
	userId,
	groupId
}: {
	userId: string;
	groupId: string;
}) => {
	const { mutate, isPending } = useLeaveGroupMutation();
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
