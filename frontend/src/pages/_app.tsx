import "@mantine/core/styles.css";
import '@mantine/notifications/styles.css';
import { MantineProvider } from "@mantine/core";
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import { theme } from "../../theme";

export default function App({ Component, pageProps }: any) {
  return (
    <MantineProvider theme={theme}>
      <ModalsProvider>
        <Notifications />
        <main>
          <Component {...pageProps} />
        </main>
      </ModalsProvider>
    </MantineProvider>
  );
}
