'use server';

import { signIn, signOut } from '@/auth';

export const signInAction = async () => {
	await signIn('github', { redirectTo: '/dashboard' });
};

export const signOutAction = async () => {
	'use server';
	await signOut({ redirectTo: '/signin' });
};
