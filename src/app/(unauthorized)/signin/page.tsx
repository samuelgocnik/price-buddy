import { CoinsIcon } from 'lucide-react';
import { type Metadata } from 'next';

import { SignInButton } from '@/components/auth/signin-button';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
	title: 'Sign In - PriceBuddy',
	description:
		'Sign in to your PriceBuddy account to track and manage your expenses.'
};

const SigInPage = () => (
	<Card className="flex w-full items-center bg-almond-200/75 p-6">
		<div className="">
			<CoinsIcon className="h-20 w-20 text-primary" />
		</div>
		<div className="flex w-full flex-col items-center justify-center space-y-6">
			<h1 className="text-3xl font-bold text-primary">PriceBuddy</h1>
			<SignInButton className="mx-auto" size="lg" />
		</div>
	</Card>
);

export default SigInPage;
