import { relations } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

import { usersExpenses } from './usersExpenses';
import { usersGroups } from './userGroups';
import { userBalances } from './userBalances';

export const users = sqliteTable('users', {
	userId: integer('user_id').primaryKey({ autoIncrement: true }),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	email: text('email').notNull(),
	photoUrl: text('photo_url'),
	createdAt: text('created_at').notNull().default(new Date().toString()),
	deletedAt: text('deleted_at')
});

export const usersRelations = relations(users, ({ many }) => ({
	expenses: many(usersExpenses),
	groups: many(usersGroups),
	balances: many(userBalances)
}));
