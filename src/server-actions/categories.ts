import { db } from '@/db';
import { categories } from '@/db/schema/categories';

export const getCategories = async () => db.get(categories);
