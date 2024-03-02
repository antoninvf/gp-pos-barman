import { AppShell, LoadingOverlay } from '@mantine/core';
import { showNotification, notifications } from '@mantine/notifications';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { type ReactNode } from 'react';

interface IProtectedPageProps {
	children: ReactNode;
}

export const ProtectedPage = ({ children }: IProtectedPageProps) => {
	const { status } = useSession();

	const { push } = useRouter();

	if (status === 'unauthenticated') {
		notifications.clean();
		void push(
			`/auth/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`,
		);
		void showNotification({
			title: 'Unauthorized',
			message: '',
			color: 'red',
			autoClose: 1000,
		});
	}
	if (status !== 'authenticated') {
		return <LoadingOverlay visible />;
	}

	return <AppShell>{children}</AppShell>;
};
