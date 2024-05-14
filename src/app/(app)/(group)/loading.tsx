import Loader from '@/components/ui/loader';
import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => (
	<div className="relative flex h-full flex-1 flex-col items-center justify-center">
		<Skeleton className="h-full w-full bg-almond-200" />
		<div className="absolute flex flex-col items-center space-y-4">
			<Loader size="3xl" className="text-primary" />
			<p className="text-lg">Preparing group detail view...</p>
		</div>
	</div>
);

export default Loading;
