import { GithubIcon } from 'lucide-react';

import { signOutAction } from '@/server-actions/auth';

import { Button, type ButtonProps } from '../ui/button';

export const SignOutButton = (props: ButtonProps) => (
	<form action={signOutAction}>
		<Button type="submit" LeadingIcon={GithubIcon} {...props}>
			Sign Out
		</Button>
	</form>
);
