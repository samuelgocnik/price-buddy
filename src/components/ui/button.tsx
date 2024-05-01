import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { type LucideIcon } from 'lucide-react';

import { cn } from '@/lib/cn';

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
	{
		variants: {
			variant: {
				default:
					'bg-primary text-primary-foreground shadow hover:bg-primary/90',
				destructive:
					'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
				outline:
					'border-2 border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground',
				secondary:
					'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline'
			},
			size: {
				default: 'h-9 px-4 py-2',
				sm: 'h-8 rounded-md px-3 text-xs',
				lg: 'h-10 rounded-md px-8',
				icon: 'h-9 w-9'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	}
);

const ICON_SIZES = {
	sm: 18,
	default: 20,
	lg: 22
} as const;

export type ButtonProps = {
	asChild?: boolean;
	LeadingIcon?: LucideIcon;
	TrailingIcon?: LucideIcon;
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
	VariantProps<typeof buttonVariants>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			asChild = false,
			LeadingIcon,
			TrailingIcon,
			...props
		},
		ref
	) => {
		const Comp = asChild ? Slot : 'button';
		const isIconSize = size === 'icon';
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			>
				<>
					{!isIconSize && LeadingIcon && (
						<LeadingIcon
							size={ICON_SIZES[size ?? 'default']}
							className={cn('shrink-0', size === 'sm' ? 'mr-1' : 'mr-2')}
						/>
					)}
					{props.children}
					{!isIconSize && TrailingIcon && (
						<TrailingIcon
							size={ICON_SIZES[size ?? 'default']}
							className={cn('shrink-0', size === 'sm' ? 'ml-1' : 'ml-2')}
						/>
					)}
				</>
			</Comp>
		);
	}
);
Button.displayName = 'Button';

export { Button, buttonVariants };
