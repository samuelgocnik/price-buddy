import { useMutation } from '@tanstack/react-query';

import { useToast } from '@/lib/hooks/use-toast';
import { signInAction, signOutAction } from '@/server-actions/auth';

export const useSignIn = () => {
	const { toast } = useToast();

	return useMutation({
		mutationFn: signInAction,
		onSuccess: () => {
			toast({
				title: 'Welcome!'
			});
		},
		onError: () => {
			toast({
				title: 'Failed to sign in',
				variant: 'destructive'
			});
		}
	});
};

export const useSignOut = () => {
	const { toast } = useToast();

	return useMutation({
		mutationFn: signOutAction,
		onSuccess: () => {
			toast({
				title: 'Goodbye!'
			});
		},
		onError: () => {
			toast({
				title: 'Failed to sign out',
				variant: 'destructive'
			});
		}
	});
};
