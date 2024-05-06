import { type HTMLProps } from 'react';
import { useFormContext } from 'react-hook-form';

import { FormInput } from './text-input';

type FormTextFieldProps = HTMLProps<HTMLInputElement> & {
	name: string;
	label: string;
};

export const FormNumberField = ({ name }: FormTextFieldProps) => {
	const { register } = useFormContext();

	return (
		<div className="flex flex-col gap-2">
			<FormInput type="number" step={0.01} {...register(name)} />
		</div>
	);
};
