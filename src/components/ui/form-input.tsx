import { type Control, type Path, type FieldValues } from 'react-hook-form';
import { type HTMLProps } from 'react';

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from './form';
import { Input } from './input';

type FormInputProps<T extends FieldValues> = HTMLProps<HTMLInputElement> & {
	label: string;
	formControl: Control<T>;
	name: Path<T>;
};

export const FormInput = <T extends FieldValues>({
	label,
	name,
	className,
	formControl,
	...inputProps
}: FormInputProps<T>) => (
	<FormField
		control={formControl}
		name={name}
		render={({ field, fieldState }) => (
			<FormItem className={className}>
				<FormLabel>{label}</FormLabel>
				<FormControl>
					<Input
						{...inputProps}
						{...field}
						className={
							fieldState.error
								? 'outline outline-offset-2 outline-red-500 focus:outline-red-500'
								: ''
						}
						onChange={e =>
							inputProps.type === 'number'
								? field.onChange(Number(e.target.value))
								: field.onChange(e.target.value)
						}
					/>
				</FormControl>
				<FormMessage />
			</FormItem>
		)}
	/>
);
