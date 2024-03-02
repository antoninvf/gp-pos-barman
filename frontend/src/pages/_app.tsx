import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import {
	MantineProvider,
	createTheme,
	type MantineColorsTuple,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { QueryClientProvider } from '~api';
import { SessionProvider, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import '@fontsource/lexend';

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: any) {
	// set page title for all pages
	useEffect(() => {
		document.title = 'Barman';
	}, []);

	const myColor: MantineColorsTuple = [
		'#f2f0ff',
		'#e0dff2',
		'#bfbdde',
		'#9b98ca',
		'#7d79ba',
		'#6a65b0',
		'#605bac',
		'#504c97',
		'#464388',
		'#3b3979',
	];

	const theme = createTheme({
		fontFamily: 'Lexend',
		colors: {
			myColor,
		},
		primaryColor: 'myColor',
	});

	return (
		<QueryClientProvider>
			<MantineProvider theme={theme}>
				<ModalsProvider>
					<Notifications />
					<SessionProvider
						session={session}
						refetchInterval={30}
						refetchOnWindowFocus={false}
					>
						{Component.auth ? (
							<Auth>
								<Component {...pageProps} />
							</Auth>
						) : (
							<Component {...pageProps} />
						)}
					</SessionProvider>
				</ModalsProvider>
			</MantineProvider>
		</QueryClientProvider>
	);
}

function Auth({ children }: { children: React.ReactNode }) {
	// if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
	const { status } = useSession({ required: true });

	if (status === 'loading') {
		console.log(status);
		return null;
	}

	return children;
}
