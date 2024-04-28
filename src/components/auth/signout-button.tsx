import { signOutAction } from '@/server-actions/auth';

import { Button } from '../ui/button';

export const SignOutButton = () => (
	<form action={signOutAction}>
		<Button type="submit">Sign Out</Button>
	</form>
);
