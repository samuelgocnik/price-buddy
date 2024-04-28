import { relations } from 'drizzle-orm';
import { text, sqliteTable } from 'drizzle-orm/sqlite-core';

import { groups } from './groups';

export const categories = sqliteTable('categories', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name').notNull(),
	color: text('color'),
	createdAt: text('created_at').notNull().default(new Date().toString()),
	deletedAt: text('deleted_at')
});

export const categoriesRelations = relations(categories, ({ many }) => ({
	groups: many(groups)
}));
