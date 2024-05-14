import { cn } from '@/lib/cn';

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export const Skeleton = ({ className, ...props }: SkeletonProps) => (
	<div
		className={cn('animate-pulse rounded-md bg-almond-200', className)}
		{...props}
	/>
);

export const SkeletonMap = ({
	wrapperClassName,
	count,
	...props
}: SkeletonProps & { count: number; wrapperClassName?: string }) => (
	<div className={cn('space-y-2', wrapperClassName)}>
		{Array.from({ length: count }).map((_, index) => (
			<Skeleton key={`skeleton-${index}`} {...props} />
		))}
	</div>
);
