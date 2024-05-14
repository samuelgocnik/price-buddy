'use server';

import { isNull } from 'drizzle-orm';

import { db } from '@/db';
import { categories } from '@/db/schema/categories';

export const getCategories = async () =>
	db.query.categories.findMany({
		where: isNull(categories.deletedAt)
	});
