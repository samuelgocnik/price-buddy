import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';

import { users, usersRelations } from './schema/users';
import { categories, categoriesRelations } from './schema/categories';
import { expenses, expensesRelations } from './schema/expenses';
import { groups, groupsRelations } from './schema/groups';
import { userBalances, userBalancesRelations } from './schema/userBalances';
import { usersGroups, usersGroupsRelations } from './schema/userGroups';
import { usersExpenses, usersExpensesRelations } from './schema/usersExpenses';

const client = createClient({
	url: process.env.DATABASE_URL!,
	authToken: process.env.DATABASE_AUTH_TOKEN
});

export const db = drizzle(client, {
	schema: {
		categories,
		expenses,
		groups,
		userBalances,
		usersGroups,
		users,
		usersExpenses,

		categoriesRelations,
		expensesRelations,
		groupsRelations,
		userBalancesRelations,
		usersGroupsRelations,
		usersRelations,
		usersExpensesRelations
	}
});
