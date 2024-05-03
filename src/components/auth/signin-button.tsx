'use client';

import { GithubIcon } from 'lucide-react';

import { useSignIn } from '@/queries/auth';

import { Button, type ButtonProps } from '../ui/button';

export const SignInButton = (props: ButtonProps) => {
	const { mutate: signIn, isPending } = useSignIn();

	return (
		<Button
			onClick={() => signIn()}
			disabled={isPending}
			LeadingIcon={GithubIcon}
			{...props}
		>
			Sign in with GitHub
		</Button>
	);
};
