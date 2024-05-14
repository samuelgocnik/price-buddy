import { and, eq, isNull } from 'drizzle-orm';

import { db } from '@/db';
import { usersGroups } from '@/db/schema/userGroups';
import { type Groups } from '@/db/schema/groups';
import { categories } from '@/db/schema/categories';

import { SelectExpense } from './select-expense';

type SelectFieldProps = {
	isCategory: boolean;
	selectedGroup?: string;
	userId: string;
};

export const SelectField = async (props: SelectFieldProps) => {
	const foundCategories = await db.query.categories.findMany({
		where: isNull(categories.deletedAt)
	});

	const userGroups = await db.query.usersGroups.findMany({
		where: and(
			eq(usersGroups.userId, props.userId),
			isNull(usersGroups.deletedAt)
		),
		with: {
			group: true
		}
	});
	const foundGroups: Groups[] = userGroups.map(x => x.group);
	const selectedGroup = foundGroups.findLast(x => x.id === props.selectedGroup);
	return (
		<SelectExpense
			categories={foundCategories}
			groups={foundGroups}
			isCategory={props.isCategory}
			selectedGroup={selectedGroup}
		/>
	);
};
