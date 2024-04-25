import { relations } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

import { groups } from './groups';

export const categories = sqliteTable('categories', {
	category_id: integer('category_id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	color: text('color'),
	created_at: integer('created_at', { mode: 'timestamp' }),
	deleted_at: integer('deleted_at', { mode: 'timestamp' })
});

export const categoriesRelations = relations(categories, ({ many }) => ({
	categoryGroups: many(groups)
}));
