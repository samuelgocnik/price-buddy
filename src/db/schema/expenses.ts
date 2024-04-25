import { relations } from 'drizzle-orm';
import { integer, sqliteTable, numeric } from 'drizzle-orm/sqlite-core';

import { usersExpenses } from './usersExpenses';
import { groups } from './groups';
import { users } from './users';
import { categories } from './categories';

export const expenses = sqliteTable('expenses', {
	expense_id: integer('expense_id').primaryKey({ autoIncrement: true }),
	amount: numeric('amount').notNull(),
	group_id: integer('group_id')
		.notNull()
		.references(() => groups.group_id),
	paid_by_id: integer('paid_by_id')
		.notNull()
		.references(() => users.user_id),
	category_id: integer('category_id')
		.notNull()
		.references(() => categories.category_id),
	created_at: integer('created_at', { mode: 'timestamp' }),
	deleted_at: integer('deleted_at', { mode: 'timestamp' })
});

export const expensesRelations = relations(expenses, ({ many, one }) => ({
	userExpenses: many(usersExpenses),
	group: one(groups, {
		fields: [expenses.group_id],
		references: [groups.group_id]
	}),
	paid_by: one(users, {
		fields: [expenses.paid_by_id],
		references: [users.user_id]
	}),
	category: one(categories, {
		fields: [expenses.category_id],
		references: [categories.category_id]
	})
}));
