import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import { cn } from '@/lib/cn';

import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app'
};

const RootLayout = ({
	children
}: Readonly<{
	children: React.ReactNode;
}>) => (
	<html lang="en">
		<body
			className={cn('flex h-screen max-h-screen flex-col', inter.className)}
		>
			<Providers>{children}</Providers>
		</body>
	</html>
);

export default RootLayout;
