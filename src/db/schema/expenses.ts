import { relations } from 'drizzle-orm';
import { sqliteTable, numeric, text } from 'drizzle-orm/sqlite-core';

import { usersExpenses } from './usersExpenses';
import { type Groups, groups } from './groups';
import { type User, users } from './users';
import { type Categories, categories } from './categories';

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

export type ExpensesWithRelations = typeof expenses.$inferSelect & {
	group: Groups;
	paidBy: User;
	category: Categories;
};
