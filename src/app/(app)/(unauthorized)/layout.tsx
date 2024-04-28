import { CoinsIcon } from 'lucide-react';
import { type PropsWithChildren } from 'react';

const UnauthorizedLayout = ({ children }: PropsWithChildren) => (
	<>
		<header className="flex items-center justify-center gap-6 bg-primary p-4 text-xl font-medium text-primary-foreground">
			<CoinsIcon size={30} />
			<h1>PriceBuddy</h1>
		</header>
		<main className="mx-auto flex min-w-full flex-1 flex-col items-center justify-center p-4 md:min-w-[30rem] md:p-8">
			{children}
		</main>
	</>
);

export default UnauthorizedLayout;
