import { db } from '@/db';

import { SelectExpense } from './select-expense';

type SelectFieldProps = {
	isCategory: boolean;
};

export const SelectField = async (props: SelectFieldProps) => {
	const foundCategories = await db.query.categories.findMany();
	const foundGroups = await db.query.groups.findMany();

	return (
		<SelectExpense
			categories={foundCategories}
			groups={foundGroups}
			isCategory={props.isCategory}
		/>
	);
};
