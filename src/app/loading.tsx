import Loader from '@/components/ui/loader';

const Loading = () => (
	<div className="flex flex-1 flex-col items-center justify-center space-y-4">
		<Loader size="3xl" className="text-primary" />
		<p className="text-lg">Preparing page...</p>
	</div>
);

export default Loading;
