import { relations } from 'drizzle-orm';
import { integer, sqliteTable, numeric, text } from 'drizzle-orm/sqlite-core';

import { usersExpenses } from './usersExpenses';
import { groups } from './groups';
import { users } from './users';
import { categories } from './categories';

export const expenses = sqliteTable('expenses', {
	expenseId: integer('expense_id').primaryKey({ autoIncrement: true }),
	amount: numeric('amount').notNull(),
	title: text('title'),
	groupId: integer('group_id')
		.notNull()
		.references(() => groups.groupId),
	paidById: integer('paid_by_id')
		.notNull()
		.references(() => users.userId),
	categoryId: integer('category_id')
		.notNull()
		.references(() => categories.categoryId),
	createdAt: text('created_at').notNull().default(new Date().toDateString()),
	deletedAt: integer('deleted_at', { mode: 'timestamp' })
});

export const expensesRelations = relations(expenses, ({ many, one }) => ({
	expenses: many(usersExpenses),
	group: one(groups, {
		fields: [expenses.groupId],
		references: [groups.groupId]
	}),
	paidBy: one(users, {
		fields: [expenses.paidById],
		references: [users.userId]
	}),
	category: one(categories, {
		fields: [expenses.categoryId],
		references: [categories.categoryId]
	})
}));
