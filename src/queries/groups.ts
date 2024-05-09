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
			await addGroupAction(data);
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
