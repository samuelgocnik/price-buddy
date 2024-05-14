'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useToast } from '@/lib/hooks/use-toast';
import {
	addGroupAction,
	addSingleUserToGroupAction,
	leaveGroupAction
} from '@/server-actions/groups';

export type AddGroupParams = {
	name: string;
	emails: string[];
	authorId: string;
};

export const useAddGroup = () => {
	const { toast } = useToast();

	return useMutation({
		mutationFn: async (data: AddGroupParams) => {
			const result = await addGroupAction(data);
			const notFoundUsers = data.emails.filter(x => !result.includes(x));

			if (notFoundUsers.length !== 0) {
				toast({
					title: `Failed to find user${notFoundUsers.length > 1 ? 's' : ''} with email${notFoundUsers.length > 1 ? 's' : ''}: ${notFoundUsers.join(', ')}`,
					variant: 'destructive'
				});
			} else {
				toast({
					title: 'Group successfully created!'
				});
			}
		},
		onError: () => {
			toast({
				title: 'Failed to create the group',
				variant: 'destructive'
			});
		}
	});
};

export const useAddUserToGroup = () => {
	const { toast } = useToast();

	return useMutation({
		mutationFn: addSingleUserToGroupAction,
		onSuccess: () => {
			toast({
				title: 'User successfully added!'
			});
		},
		onError: () => {
			toast({
				title: 'Failed to add the user to the group!',
				variant: 'destructive'
			});
		}
	});
};

export const useLeaveGroup = () => {
	const r = useRouter();
	const { toast } = useToast();

	return useMutation<
		void,
		Error,
		{
			userId: string;
			groupId: string;
		}
	>({
		mutationFn: leaveGroupAction,
		onSuccess: () => {
			toast({ title: 'Group left!' });
			r.push('/group');
		},
		onError: () => {
			toast({
				title: 'Failed to leave group',
				variant: 'destructive'
			});
		}
	});
};
