'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type PropsWithChildren } from 'react';

import { Toaster } from '@/components/ui/toaster';

const queryClient = new QueryClient();

export const Providers = ({ children }: PropsWithChildren) => (
	<>
		<Toaster />
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	</>
);
