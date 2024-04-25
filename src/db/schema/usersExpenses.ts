import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { users } from './users';
import { expenses } from './expenses';

export const usersExpenses = sqliteTable('usersExpenses', {
	user_expense_id: integer('user_expense_id').primaryKey({
		autoIncrement: true
	}),
	user_id: text('user_id')
		.notNull()
		.references(() => users.user_id),
	expense_id: text('expense_id')
		.notNull()
		.references(() => expenses.expense_id),
	created_at: integer('created_at', { mode: 'timestamp' }),
	deleted_at: integer('deleted_at', { mode: 'timestamp' })
});

export const usersExpensesRelations = relations(usersExpenses, ({ one }) => ({
	expense: one(expenses, {
		fields: [usersExpenses.user_id],
		references: [expenses.expense_id]
	}),
	user: one(users, {
		fields: [usersExpenses.expense_id],
		references: [users.user_id]
	})
}));
