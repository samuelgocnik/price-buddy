import * as React from 'react';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { db } from '@/db';

type SelectProps = {
	isCategory: boolean;
};

export const SelectExpense = async (props: SelectProps) => {
	const foundCategories = await db.query.categories.findMany();
	const foundGroups = await db.query.groups.findMany();

	const options = props.isCategory ? foundCategories : foundGroups;
	return (
		<Select>
			<SelectTrigger className="w-[180px]">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{options.map(option => (
						<SelectItem key={option.id} value={option.id}>
							{option.name}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};
