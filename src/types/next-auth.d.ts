// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { type DefaultSession } from 'next-auth';

declare module 'next-auth' {
	type Session = {
		user: DefaultSession['user'] & {
			id: string;
		};
	};
}
