import { forwardRef, type HTMLProps } from 'react';

import { Input } from '../input';

type TextInputProps = HTMLProps<HTMLInputElement>;

export const FormInput = forwardRef<HTMLInputElement, TextInputProps>(
	(inputProps, ref) => <Input ref={ref} className="w-64" {...inputProps} />
);
