import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { users } from './users';
import { groups } from './groups';

export const usersGroups = sqliteTable('usersGroups', {
	userGroupId: integer('user_group_id').primaryKey({
		autoIncrement: true
	}),
	userId: text('user_id')
		.notNull()
		.references(() => users.userId),
	groupId: text('group_id')
		.notNull()
		.references(() => groups.groupId),
	createdAt: text('created_at').notNull().default(new Date().toDateString()),
	deletedAt: integer('deleted_at', { mode: 'timestamp' })
});

export const usersGroupsRelations = relations(usersGroups, ({ one }) => ({
	user: one(users, {
		fields: [usersGroups.userId],
		references: [users.userId]
	}),
	group: one(groups, {
		fields: [usersGroups.groupId],
		references: [groups.groupId]
	})
}));
