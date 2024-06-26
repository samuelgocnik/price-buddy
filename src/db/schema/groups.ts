import { relations } from 'drizzle-orm';
import { text, sqliteTable } from 'drizzle-orm/sqlite-core';

import { type UsersGroups, usersGroups } from './userGroups';
import { type Expenses, expenses } from './expenses';

export const groups = sqliteTable('groups', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	photoUrl: text('photo_url'),
	createdAt: text('created_at').notNull().default(new Date().toString()),
	deletedAt: text('deleted_at')
});

export const groupsRelations = relations(groups, ({ many }) => ({
	users: many(usersGroups),
	expenses: many(expenses)
}));

export type Groups = typeof groups.$inferSelect;

export type GroupsCreate = typeof groups.$inferInsert;

export type GroupsWithRelations = typeof groups.$inferSelect & {
	users: UsersGroups[];
	expenses: Expenses[];
};
