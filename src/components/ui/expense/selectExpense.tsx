'use client';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select';
import { type Categories } from '@/db/schema/categories';
import { type Groups } from '@/db/schema/groups';

type SelectProps = {
	isCategory: boolean;
	categories: Categories[];
	groups: Groups[];
};

export const SelectExpense = (props: SelectProps) => {
	const { register } = useFormContext();

	const options = props.isCategory ? props.categories : props.groups;
	const isLoading = options === undefined;

	return (
		<Select
			{...register(props.isCategory ? 'category' : 'group')}
			disabled={isLoading}
		>
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
