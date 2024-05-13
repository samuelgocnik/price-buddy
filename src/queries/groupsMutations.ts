'use client';
import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/lib/hooks/use-toast';
import {
	addGroupAction,
	addSingleUserToGroupAction,
	type addUserToGroupParams
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

			// Prepend the prefix "Not found users: " to the joined string
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
		mutationFn: async (data: addUserToGroupParams) => {
			const result = await addSingleUserToGroupAction(data);
			if (result !== undefined && result !== null && result.length !== 0) {
				toast({
					title: result,
					variant: 'destructive'
				});
			} else {
				toast({
					title: 'User successfully added!'
				});
			}
		}
	});
};
