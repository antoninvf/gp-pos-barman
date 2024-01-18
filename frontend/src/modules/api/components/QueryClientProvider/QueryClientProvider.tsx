'use client';

import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import {
	QueryClient,
	QueryClientProvider as RaQueryClientProvider,
} from '@tanstack/react-query';

interface QueryClientProps extends PropsWithChildren {}

export const QueryClientProvider = ({ children }: QueryClientProps) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchInterval: 1000,
					},
				},
			}),
	);

	return (
		<RaQueryClientProvider client={queryClient}>
			{children}
		</RaQueryClientProvider>
	);
};
