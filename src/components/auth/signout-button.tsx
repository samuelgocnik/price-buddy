'use client';

import { GithubIcon } from 'lucide-react';

import { useSignOut } from '@/queries/auth';

import { Button, type ButtonProps } from '../ui/button';

export const SignOutButton = (props: ButtonProps) => {
	const { mutate: signOut, isPending } = useSignOut();

	return (
		<Button
			onClick={() => signOut()}
			disabled={isPending}
			LeadingIcon={GithubIcon}
			{...props}
		>
			Sign out
		</Button>
	);
};
