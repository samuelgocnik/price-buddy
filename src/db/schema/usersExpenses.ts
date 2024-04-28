import { text, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

import { users } from './users';
import { expenses } from './expenses';

export const usersExpenses = sqliteTable('usersExpenses', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	expenseId: text('expense_id')
		.notNull()
		.references(() => expenses.id),
	createdAt: text('created_at').notNull().default(new Date().toString()),
	deletedAt: text('deleted_at')
});

export const usersExpensesRelations = relations(usersExpenses, ({ one }) => ({
	expense: one(expenses, {
		fields: [usersExpenses.userId],
		references: [expenses.id]
	}),
	user: one(users, {
		fields: [usersExpenses.expenseId],
		references: [users.id]
	})
}));
