import { signInAction } from '@/server-actions/auth';

import { Button } from '../ui/button';

export const SignInButton = () => (
	<form action={signInAction}>
		<Button>Sign In</Button>
	</form>
);
