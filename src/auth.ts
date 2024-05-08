import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { eq } from 'drizzle-orm';

import { db } from './db';
import { users } from './db/schema/users';

// Define the paths that require authentication
const PROTECTED_PATHS = ['/group', '/dashboard', '/profile'];

const getIsProtectedPath = (path: string) =>
	PROTECTED_PATHS.some(p => path.startsWith(p));

const SIGNIN_PATH = '/signin';

// Define your configuration in a separate variable and pass it to NextAuth()
// This way we can also 'export const config' for use later
export const authConfig = {
	providers: [GitHub],
	adapter: DrizzleAdapter(db),
	session: {
		strategy: 'database'
	},
	callbacks: {
		authorized: ({ auth, request: { nextUrl } }) => {
			const isLoggedIn = !!auth?.user;

			const isProtected = getIsProtectedPath(nextUrl.pathname);

			if (!isLoggedIn && isProtected) {
				const redirectUrl = new URL(SIGNIN_PATH, nextUrl.origin);
				redirectUrl.searchParams.append('callbackUrl', nextUrl.href);
				return Response.redirect(redirectUrl);
			}

			// Redirect logged in users to dashboard
			const isSignInPage = nextUrl.pathname === SIGNIN_PATH;
			if (isLoggedIn && isSignInPage) {
				return Response.redirect(new URL('/dashboard', nextUrl.origin));
			}

			return true;
		},

		session: async ({ session, user }) => {
			// Assign user.id to session.user.id as we need it for relations in
			// database and it's not included in the default session object
			const userDb = await db.query.users.findFirst({
				where: eq(users.id, user.id)
			});

			if (!userDb) {
				throw new Error('User not found');
			}

			session.user.id = user.id;
			session.user.firstName = userDb.firstName;
			session.user.lastName = userDb.lastName;

			return session;
		}
	}
} satisfies NextAuthConfig;

export const { signIn, signOut, handlers, auth } = NextAuth(authConfig);
