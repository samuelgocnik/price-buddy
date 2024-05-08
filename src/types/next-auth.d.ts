// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { type DefaultSession } from 'next-auth';

declare module 'next-auth' {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Session extends DefaultSession {
		user: {
			id: string;
			firstName: string | null;
			lastName: string | null;
		} & DefaultSession['user'];
	}
}
