import { relations } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

import { usersExpenses } from './usersExpenses';
import { usersGroups } from './userGroups';
import { userBalances } from './userBalances';

export const users = sqliteTable('users', {
	user_id: integer('user_id').primaryKey({ autoIncrement: true }),
	first_name: text('first_name').notNull(),
	last_name: text('last_name').notNull(),
	email: text('email').notNull(),
	photo_url: text('photo_url'),
	created_at: integer('created_at', { mode: 'timestamp' }),
	deleted_at: integer('deleted_at', { mode: 'timestamp' })
});

export const usersRelations = relations(users, ({ many }) => ({
	userExpenses: many(usersExpenses),
	userGroups: many(usersGroups),
	userBalances: many(userBalances)
}));
