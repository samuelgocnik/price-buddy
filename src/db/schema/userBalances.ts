import { text, integer, sqliteTable, numeric } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { users } from './users';

export const userBalances = sqliteTable('userBalances', {
	userBalanceId: integer('user_balance_id').primaryKey({
		autoIncrement: true
	}),
	user1Id: text('user_1_id')
		.notNull()
		.references(() => users.userId),
	user2Id: text('user_2_id')
		.notNull()
		.references(() => users.userId),
	balance: numeric('balance').notNull().default('0'),
	createdAt: text('created_at').notNull().default(new Date().toDateString()),
	deletedAt: integer('deleted_at', { mode: 'timestamp' })
});

export const userBalancesRelations = relations(userBalances, ({ one }) => ({
	user1: one(users, {
		fields: [userBalances.user1Id],
		references: [users.userId]
	}),
	user2: one(users, {
		fields: [userBalances.user2Id],
		references: [users.userId]
	})
}));
