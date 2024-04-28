import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { users } from './users';
import { expenses } from './expenses';

export const usersExpenses = sqliteTable('usersExpenses', {
	userExpenseId: integer('user_expense_id').primaryKey({
		autoIncrement: true
	}),
	userId: text('user_id')
		.notNull()
		.references(() => users.userId),
	expenseId: text('expense_id')
		.notNull()
		.references(() => expenses.expenseId),
	createdAt: text('created_at').notNull().default(new Date().toString()),
	deletedAt: text('deleted_at')
});

export const usersExpensesRelations = relations(usersExpenses, ({ one }) => ({
	expense: one(expenses, {
		fields: [usersExpenses.userId],
		references: [expenses.expenseId]
	}),
	user: one(users, {
		fields: [usersExpenses.expenseId],
		references: [users.userId]
	})
}));
