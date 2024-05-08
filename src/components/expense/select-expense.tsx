'use client';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';

import { type Categories } from '@/db/schema/categories';
import { type Groups } from '@/db/schema/groups';

import { FormLabel } from '../ui/form';

type SelectProps = React.DetailedHTMLProps<
	React.SelectHTMLAttributes<HTMLSelectElement>,
	HTMLSelectElement
> & {
	isCategory: boolean;
	categories: Categories[];
	groups: Groups[];
	selectedGroup?: Groups;
};

export const SelectExpense = (props: SelectProps) => {
	const { register } = useFormContext();
	const options = props.isCategory ? props.categories : props.groups;

	return (
		<>
			<FormLabel>Group</FormLabel>
			<select
				className="disabled:opacity-50, flex h-9  rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed"
				id={props.isCategory ? 'categoryId' : 'groupId'}
				disabled={props.selectedGroup !== undefined && !props.isCategory}
				{...register(props.isCategory ? 'categoryId' : 'groupId')}
			>
				{props.selectedGroup !== undefined && (
					<option value={props.selectedGroup.id} selected>
						{props.selectedGroup.name}
					</option>
				)}
				{(options ?? ['Loading...']).map(option => (
					<option key={option.id} value={option.id}>
						{option.name}
					</option>
				))}
			</select>
		</>
	);
};
