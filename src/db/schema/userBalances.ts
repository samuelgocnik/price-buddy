import { text, integer, sqliteTable, numeric } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { users } from './users';

export const userBalances = sqliteTable('userBalances', {
	user_balance_id: integer('user_balance_id').primaryKey({
		autoIncrement: true
	}),
	user_1_id: text('user_1_id')
		.notNull()
		.references(() => users.user_id),
	user_2_id: text('user_2_id')
		.notNull()
		.references(() => users.user_id),
	balance: numeric('balance').notNull().default('0'),
	created_at: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.default(new Date()),
	deleted_at: integer('deleted_at', { mode: 'timestamp' })
});

export const userBalancesRelations = relations(userBalances, ({ one }) => ({
	user_1: one(users, {
		fields: [userBalances.user_1_id],
		references: [users.user_id]
	}),
	user_2: one(users, {
		fields: [userBalances.user_2_id],
		references: [users.user_id]
	})
}));
