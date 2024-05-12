import { relations } from 'drizzle-orm';
import {
	text,
	integer,
	sqliteTable,
	primaryKey
} from 'drizzle-orm/sqlite-core';
import type { AdapterAccount } from 'next-auth/adapters';

import { usersExpenses } from './usersExpenses';
import { usersGroups } from './userGroups';
import { userBalances } from './userBalances';

export const users = sqliteTable('user', {
	firstName: text('first_name'), // can be used for display name that can be customized in profile
	lastName: text('last_name'), // can be used for display name that can be customized in profile
	createdAt: text('created_at').notNull().default(new Date().toString()),
	deletedAt: text('deleted_at'),

	// github
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name'),
	email: text('email').notNull(),
	emailVerified: integer('emailVerified', { mode: 'timestamp_ms' }),
	image: text('image')
});

export const usersRelations = relations(users, ({ many }) => ({
	expenses: many(usersExpenses),
	groups: many(usersGroups),
	balanceOwe: many(userBalances, {
		relationName: 'user1Balance'
	}),
	balanceOwed: many(userBalances, {
		relationName: 'user2Balance'
	})
}));

// Auth.js OAuth related stuff
export const accounts = sqliteTable(
	'account',
	{
		userId: text('userId')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		type: text('type').$type<AdapterAccount['type']>().notNull(),
		provider: text('provider').notNull(),
		providerAccountId: text('providerAccountId').notNull(),
		refresh_token: text('refresh_token'),
		access_token: text('access_token'),
		expires_at: integer('expires_at'),
		token_type: text('token_type'),
		scope: text('scope'),
		id_token: text('id_token'),
		session_state: text('session_state')
	},
	account => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId]
		})
	})
);

export const sessions = sqliteTable('session', {
	sessionToken: text('sessionToken').primaryKey(),
	userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expires: integer('expires', { mode: 'timestamp_ms' }).notNull()
});

export const verificationTokens = sqliteTable(
	'verificationToken',
	{
		identifier: text('identifier').notNull(),
		token: text('token').notNull(),
		expires: integer('expires', { mode: 'timestamp_ms' }).notNull()
	},
	vt => ({
		compoundKey: primaryKey({ columns: [vt.identifier, vt.token] })
	})
);

export type User = typeof users.$inferSelect;

export type UserCreate = typeof users.$inferInsert;
