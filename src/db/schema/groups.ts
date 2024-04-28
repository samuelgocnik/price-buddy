import { relations } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

import { usersGroups } from './userGroups';
import { expenses } from './expenses';

export const groups = sqliteTable('groups', {
	group_id: integer('group_id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	photo_url: text('photo_url'),
	created_at: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.default(new Date()),
	deleted_at: integer('deleted_at', { mode: 'timestamp' })
});

export const groupsRelations = relations(groups, ({ many }) => ({
	users: many(usersGroups),
	expenses: many(expenses)
}));
