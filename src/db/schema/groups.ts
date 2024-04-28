import { relations } from 'drizzle-orm';
import { text, sqliteTable } from 'drizzle-orm/sqlite-core';

import { usersGroups } from './userGroups';
import { expenses } from './expenses';

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
