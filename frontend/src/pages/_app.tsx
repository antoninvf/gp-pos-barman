import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { theme } from '../../theme';
import { QueryClientProvider } from '../modules/api';

export default function App({ Component, pageProps }: any) {
	return (
		<QueryClientProvider>
			<MantineProvider theme={theme}>
				<ModalsProvider>
					<Notifications />
					<main>
						<Component {...pageProps} />
					</main>
				</ModalsProvider>
			</MantineProvider>
		</QueryClientProvider>
	);
}
