import { text, sqliteTable, numeric } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { users } from './users';

export const userBalances = sqliteTable('userBalances', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	user1Id: text('user_1_id')
		.notNull()
		.references(() => users.id),
	user2Id: text('user_2_id')
		.notNull()
		.references(() => users.id),
	balance: numeric('balance').notNull().default('0'),
	createdAt: text('created_at').notNull().default(new Date().toString()),
	deletedAt: text('deleted_at')
});

export const userBalancesRelations = relations(userBalances, ({ one }) => ({
	user1: one(users, {
		fields: [userBalances.user1Id],
		references: [users.id]
	}),
	user2: one(users, {
		fields: [userBalances.user2Id],
		references: [users.id]
	})
}));
