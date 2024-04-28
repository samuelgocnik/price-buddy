import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import { DrizzleAdapter } from '@auth/drizzle-adapter';

import { db } from './db';

// Define your configuration in a separate variable and pass it to NextAuth()
// This way we can also 'export const config' for use later
export const authConfig = {
	providers: [GitHub],
	adapter: DrizzleAdapter(db),
	pages: {
		signIn: '/signin'
	},
	callbacks: {
		authorized: ({ auth, request: { nextUrl } }) => {
			const isLoggedIn = !!auth?.user;

			// TODO: protect all pages except /signin
			const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
			if (isOnDashboard) {
				return isLoggedIn; // if false redirect unauthenticated users to login page
			} else if (isLoggedIn) {
				return Response.redirect(new URL('/dashboard', nextUrl));
			}
			return true;
		},

		session: ({ session, user }) => {
			// Assign user.id to session.user.id
			session.user.id = user.id;

			return session;
		}
	}
} satisfies NextAuthConfig;

export const { signIn, signOut, handlers, auth } = NextAuth(authConfig);
