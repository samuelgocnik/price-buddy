import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { users } from './users';
import { groups } from './groups';

export const usersGroups = sqliteTable('usersGroups', {
	user_group_id: integer('user_group_id').primaryKey({
		autoIncrement: true
	}),
	user_id: text('user_id')
		.notNull()
		.references(() => users.user_id),
	group_id: text('group_id')
		.notNull()
		.references(() => groups.group_id),
	created_at: integer('created_at', { mode: 'timestamp' }),
	deleted_at: integer('deleted_at', { mode: 'timestamp' })
});

export const userBalancesRelations = relations(usersGroups, ({ one }) => ({
	user_1: one(users, {
		fields: [usersGroups.user_id],
		references: [users.user_id]
	}),
	user_2: one(groups, {
		fields: [usersGroups.group_id],
		references: [groups.group_id]
	})
}));
