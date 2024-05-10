import { eq } from 'drizzle-orm';

import { db } from '@/db';
import { usersGroups } from '@/db/schema/userGroups';
import { groups, type Groups } from '@/db/schema/groups';

import { SelectExpense } from './select-expense';

type SelectFieldProps = {
	isCategory: boolean;
	selectedGroup?: string;
	userId: string;
};

export const SelectField = async (props: SelectFieldProps) => {
	const foundCategories = await db.query.categories.findMany();

	const userGroups = await db
		.select()
		.from(usersGroups)
		.where(eq(usersGroups.userId, props.userId))
		.innerJoin(groups, eq(usersGroups.groupId, groups.id));
	const foundGroups: Groups[] = userGroups.map(x => x.groups);
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
