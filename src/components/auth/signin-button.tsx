import { GithubIcon } from 'lucide-react';

import { signInAction } from '@/server-actions/auth';

import { Button, type ButtonProps } from '../ui/button';

export const SignInButton = (props: ButtonProps) => (
	<form action={signInAction}>
		<Button type="submit" LeadingIcon={GithubIcon} {...props}>
			Sign In with GitHub
		</Button>
	</form>
);
