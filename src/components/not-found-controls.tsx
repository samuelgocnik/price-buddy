'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { Button } from './ui/button';

const NotFoundControls = () => {
	const router = useRouter();

	return (
		<>
			<Button className="max-md:w-full" onClick={() => router.back()}>
				Go to previous page
			</Button>
			<Button className="max-md:w-full">
				<Link href="/dashboard">Go to home page</Link>
			</Button>
		</>
	);
};

export default NotFoundControls;
