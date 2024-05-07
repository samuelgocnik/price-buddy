import { relations } from 'drizzle-orm';
import { sqliteTable, numeric, text } from 'drizzle-orm/sqlite-core';

import { usersExpenses } from './usersExpenses';
import { groups } from './groups';
import { users } from './users';
import { categories } from './categories';

export const expenses = sqliteTable('expenses', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	amount: numeric('amount').notNull(),
	title: text('title'),
	groupId: text('group_id')
		.notNull()
		.references(() => groups.id),
	paidById: text('paid_by_id')
		.notNull()
		.references(() => users.id),
	categoryId: text('category_id')
		.notNull()
		.references(() => categories.id),
	createdAt: text('created_at').notNull().default(new Date().toString()),
	deletedAt: text('deleted_at')
});

export const expensesRelations = relations(expenses, ({ many, one }) => ({
	expenses: many(usersExpenses),
	group: one(groups, {
		fields: [expenses.groupId],
		references: [groups.id]
	}),
	paidBy: one(users, {
		fields: [expenses.paidById],
		references: [users.id]
	}),
	category: one(categories, {
		fields: [expenses.categoryId],
		references: [categories.id]
	})
}));

export type Expenses = typeof expenses.$inferSelect;

export type ExpensesCreate = typeof expenses.$inferInsert;
