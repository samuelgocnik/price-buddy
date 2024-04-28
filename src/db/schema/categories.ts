import { relations } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

import { groups } from './groups';

export const categories = sqliteTable('categories', {
	categoryId: integer('category_id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	color: text('color'),
	createdAt: text('created_at').notNull().default(new Date().toDateString()),
	deletedAt: integer('deleted_at', { mode: 'timestamp' })
});

export const categoriesRelations = relations(categories, ({ many }) => ({
	groups: many(groups)
}));