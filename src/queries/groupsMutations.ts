'use client';
import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/lib/hooks/use-toast';
import {
	addGroupAction,
	addSingleUserToGroupAction
} from '@/server-actions/groups';

export type addGroupParams = {
	name: string;
	emails: string[];
	authorId: string;
};

export const useAddGroup = () => {
	const { toast } = useToast();

	return useMutation({
		mutationFn: async (data: addGroupParams) => {
			const result = await addGroupAction(data);
			const notFoundUsers = data.emails.filter(x => !result.includes(x));
			const emailList = notFoundUsers.join(', ');

			if (notFoundUsers.length !== 0) {
				toast({
					title: `Failed to find users with emails: ${emailList}`,
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

export const useAddUserToGroupMutation = () => {
	const { toast } = useToast();

	return useMutation({
		mutationFn: addSingleUserToGroupAction,
		onSuccess: () => {
			toast({
				title: 'User successfully added!'
			});
		},
		onError: e => {
			toast({
				title: e.message,
				variant: 'destructive'
			});
		}
	});
};
