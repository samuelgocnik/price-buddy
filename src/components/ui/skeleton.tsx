import { cn } from '@/lib/cn';

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export const Skeleton = ({ className, ...props }: SkeletonProps) => (
	<div
		className={cn('animate-pulse rounded-md bg-almond-200', className)}
		{...props}
	/>
);
