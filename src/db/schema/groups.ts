import { relations } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

import { usersGroups } from './userGroups';
import { expenses } from './expenses';

export const groups = sqliteTable('groups', {
	groupId: integer('group_id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	photoUrl: text('photo_url'),
	createdAt: text('created_at').notNull().default(new Date().toDateString()),
	deletedAt: integer('deleted_at', { mode: 'timestamp' })
});

export const groupsRelations = relations(groups, ({ many }) => ({
	users: many(usersGroups),
	expenses: many(expenses)
}));
