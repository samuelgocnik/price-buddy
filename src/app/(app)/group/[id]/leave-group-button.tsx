'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/lib/hooks/use-toast';
import { Button } from '@/components/ui/button';

import { leaveGroupAction } from '../../../../queries/groups';

type LeaveGroupMutationParams = {
	userId: string;
	groupId: string;
};

const useLeaveGroupMutation = () => {
	const r = useRouter();
	const { toast } = useToast();

	const mutation = useMutation({
		mutationFn: async (params: LeaveGroupMutationParams) => {
			await leaveGroupAction(params.userId, params.groupId);
			toast({ title: 'Group left!' });
			r.push('/group');
		}
	});

	return {
		mutate: mutation.mutate,
		isPending: mutation.isPending
	};
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
			{isPending && <div className="mt-9">Leaving group...</div>}
			{!isPending && (
				<Button
					TrailingIcon={LogOut}
					className="mt-9 w-32 border-none text-red-800 hover:text-red-600"
					variant="ghost"
					onClick={() => {
						mutate({ userId, groupId });
					}}
				>
					Leave group
				</Button>
			)}
		</div>
	);
};
