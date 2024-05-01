import React from 'react';

import { cn } from '@/lib/cn';

const SIZES = {
	'xs': 'w-4 h-4 [&>div]:m-0.5 [&>div]:h-3 [&>div]:w-3 [&>div]:border-2',
	'sm': 'w-6 h-6 [&>div]:m-1 [&>div]:h-4 [&>div]:w-4 [&>div]:border-2',
	'md': 'w-8 h-8 [&>div]:m-1 [&>div]:h-6 [&>div]:w-6 [&>div]:border-[4px]',
	'lg': 'w-12 h-12 [&>div]:m-1 [&>div]:h-[2.5rem] [&>div]:w-[2.5rem] [&>div]:border-[6px]',
	'xl': 'w-16 h-16 [&>div]:m-1 [&>div]:h-[3.5rem] [&>div]:w-[3.5rem] [&>div]:border-[7px]',
	'2xl':
		'w-20 h-20 [&>div]:m-1 [&>div]:h-[4.5rem] [&>div]:w-[4.5rem] [&>div]:border-8'
};

type LoaderProps = {
	className?: string;
	size?: keyof typeof SIZES;
};

const Loader = ({ size = 'xs', className }: LoaderProps) => (
	<div className={cn('lds-ring', SIZES[size], className)}>
		<div />
		<div />
		<div />
		<div />
	</div>
);

export default Loader;
