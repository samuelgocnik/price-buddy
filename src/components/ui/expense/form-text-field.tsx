import { type HTMLProps } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormInput } from './text-input';

type FormTextFieldProps = HTMLProps<HTMLInputElement> & {
	name: string;
	label: string;
};

export const FormTextField = ({ name, ...inputProps }: FormTextFieldProps) => {
	const { register } = useFormContext();

	return (
		<div className="flex flex-col gap-2">
			<FormInput {...inputProps} {...register(name)} />
		</div>
	);
};
