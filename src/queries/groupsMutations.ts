import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/lib/hooks/use-toast';
import { addGroupAction } from '@/server-actions/groups';

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
			notFoundUsers.forEach((email, index) =>
				setTimeout(() => {
					toast({
						title: `Failed to find user with email: ${email}`,
						variant: 'destructive'
					});
				}, index * 1000)
			);
		},
		onSuccess: () => {
			toast({
				title: 'Group successfully created!'
			});
		},
		onError: () => {
			toast({
				title: 'Failed to create the group',
				variant: 'destructive'
			});
		}
	});
};
