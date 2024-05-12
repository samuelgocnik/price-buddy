import { type UseMutationOptions, useMutation } from '@tanstack/react-query';

import { useToast } from '@/lib/hooks/use-toast';
import {
	revertToGithubNameAction,
	updateUserNameAction
} from '@/server-actions/user';
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
			toast({ title: 'Profile successfully updated!' });
			options.onSuccess?.(data, variables, context);
		},
		onError: (error, variables, context) => {
			toast({
				title: 'Failed to update user profile',
				description: error.message,
				variant: 'destructive'
			});
			options.onError?.(error, variables, context);
		}
	});
};

export const useRevertToGithubName = (
	options: Omit<
		UseMutationOptions<number, Error, User['id']>,
		'mutationFn'
	> = {}
) => {
	const { toast } = useToast();

	return useMutation<number, Error, User['id']>({
		mutationFn: revertToGithubNameAction,
		...options,
		onSuccess: (data, variables, context) => {
			toast({ title: 'Successfully reverted to github name!' });
			options.onSuccess?.(data, variables, context);
		},
		onError: (error, variables, context) => {
			toast({
				title: "Couldn't revert to github name",
				description: error.message,
				variant: 'destructive'
			});
			options.onError?.(error, variables, context);
		}
	});
};
