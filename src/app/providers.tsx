'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type PropsWithChildren } from 'react';
import { SessionProvider } from 'next-auth/react';

import { Toaster } from '@/components/ui/toaster';

const queryClient = new QueryClient();

export const Providers = ({ children }: PropsWithChildren) => (
	<>
		<Toaster />
		<SessionProvider>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</SessionProvider>
	</>
);
