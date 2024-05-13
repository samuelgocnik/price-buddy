import { SearchXIcon } from 'lucide-react';
import { type Metadata } from 'next';

import NotFoundControls from '@/components/not-found-controls';

export const metadata: Metadata = {
	title: 'Page not found - PriceBuddy',
	description:
		'The page you are looking for was not found. Please check the URL or navigate to another page.'
};

const NotFoundPage = () => (
	<main className="flex flex-1 flex-col items-center justify-center space-y-8 p-4">
		<section className="flex items-center justify-center max-md:flex-col max-md:space-y-4 max-md:text-center md:space-x-4">
			<SearchXIcon size={128} />
			<div>
				<p className="text-lg font-bold">The requested URL was not found.</p>
				<p className="text-lg text-blue-smoke-800">That&apos;s all we know.</p>
			</div>
		</section>
		<section className="max-md:space-y-3 md:grid md:grid-cols-2 md:gap-x-4">
			<NotFoundControls />
		</section>
	</main>
);

export default NotFoundPage;
