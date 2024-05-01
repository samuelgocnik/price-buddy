import { text, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { users } from './users';
import { groups } from './groups';

export const usersGroups = sqliteTable('usersGroups', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	groupId: text('group_id')
		.notNull()
		.references(() => groups.id),
	createdAt: text('created_at').notNull().default(new Date().toString()),
	deletedAt: text('deleted_at')
});

export const usersGroupsRelations = relations(usersGroups, ({ one }) => ({
	user: one(users, {
		fields: [usersGroups.id],
		references: [users.id]
	}),
	group: one(groups, {
		fields: [usersGroups.id],
		references: [groups.id]
	})
}));

export type UsersGroups = typeof usersGroups.$inferSelect;

export type UsersGroupsCreate = typeof usersGroups.$inferInsert;
