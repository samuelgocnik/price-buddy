import { text, sqliteTable, numeric } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { type User, users } from './users';

// what user2Id owes to user1Id
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
		relationName: 'user1Balance',
		fields: [userBalances.user1Id],
		references: [users.id]
	}),
	user2: one(users, {
		relationName: 'user2Balance',
		fields: [userBalances.user2Id],
		references: [users.id]
	})
}));

export type UserBalances = typeof userBalances.$inferSelect;

export type UserBalancesCreate = typeof userBalances.$inferInsert;

export type BalancesWithUsers = Pick<UserBalances, 'id' | 'balance'> & {
	user1: User;
	user2: User;
};
