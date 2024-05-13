import { type HTMLProps } from 'react';
import { type FieldValues, type Control, type Path } from 'react-hook-form';

import { cn } from '@/lib/cn';

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '../ui/form';
import { Input } from '../ui/input';

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
				<div
					className={cn(
						'max-md:space-y-2 md:grid md:grid-cols-[1fr_4fr] md:gap-3',
						!fieldState.error && 'md:items-center'
					)}
				>
					<FormLabel
						className={cn('md:text-right', fieldState.error && 'mt-3')}
					>
						{label}
					</FormLabel>
					<div className="space-y-2">
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
					</div>
				</div>
			</FormItem>
		)}
	/>
);
