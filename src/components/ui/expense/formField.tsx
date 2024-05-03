'use client';
import { type UseFormReturn } from 'react-hook-form';

import {
	FormField,
	FormItem,
	FormControl,
	FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

type FormFieldProps = {
	form: UseFormReturn<
		{
			title: string;
			amount: number;
			group: string;
			category: string;
		},
		any,
		undefined
	>;
	id: 'title' | 'amount' | 'group' | 'category';
	type: string;
	defaultValue?: string;
	step?: string;
};

export const DialogFormField = (props: FormFieldProps) => (
	<FormField
		control={props.form.control}
		name={props.id}
		render={({ field }) => (
			<FormItem>
				<FormControl>
					<Input
						type={props.type}
						id={props.id}
						{...field}
						className="col-span-3"
						step={0.01}
					/>
				</FormControl>
				<FormMessage />
			</FormItem>
		)}
	/>
);
