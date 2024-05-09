import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

import { useToast } from '@/lib/hooks/use-toast';
import { updateUserNameAction } from '@/server-actions/user';
import { type EditProfileFormSchema } from '@/schema/user';
import { type User } from '@/db/schema/users';

export const useUpdateUserProfile = (
	options: Omit<
		UseMutationOptions<number, Error, EditProfileFormSchema & Pick<User, 'id'>>,
		'mutationFn'
	> = {}
) => {
	const { toast } = useToast();

	return useMutation<number, Error, EditProfileFormSchema & Pick<User, 'id'>>({
		mutationFn: updateUserNameAction,
		...options,
		onSuccess: (data, variables, context) => {
			toast({ title: 'Profile updated successfully' });
			options.onSuccess?.(data, variables, context);
		},
		onError: (error, variables, context) => {
			toast({
				title: error.message,
				variant: 'destructive'
			});
			options.onError?.(error, variables, context);
		}
	});
};
