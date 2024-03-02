import { useRouter } from 'next/router';
import { Button, Divider, Flex, PasswordInput, TextInput } from '@mantine/core';
import { IconChevronsRight } from '@tabler/icons-react';
import classes from '/src/styles/Login.module.css';
import BarmanLogo from '~components/BarmanLogo/BarmanLogo';
import type {
	GetServerSidePropsContext,
	InferGetServerSidePropsType,
} from 'next';
import { getCsrfToken, signIn, useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import { notifications, showNotification } from '@mantine/notifications';
import { useForm } from '@mantine/form';

export default function Login({
	csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const router = useRouter();
	const { status } = useSession();
	const { error } = router.query;

	useEffect(() => {
		if (status === 'unauthenticated' && router.pathname !== '/auth/login') {
			void router.push('/auth/login');
		} else if (status === 'authenticated') {
			notifications.clean();
			void router.push('/');
			showNotification({
				title: 'Success',
				message: 'User logged in!',
				color: 'green',
				autoClose: 1500,
			});
		}
		if (error) {
			router.query = {};
			notifications.clean();
			void router.push('/auth/login');
			showNotification({
				title: 'Error',
				message: 'Invalid credentials',
				color: 'red',
				autoClose: 1500,
			});
		}
	}, [status, router, error]);

	const form = useForm({
		initialValues: {
			username: '',
			password: '',
		},

		validate: {
			username: (value) => {
				if (value.length < 1) {
					return 'Username is too short';
				}
			},
			password: (value) => {
				if (value.length < 8) {
					return 'Password is too short';
				}
			},
		},
	});

	return (
		<Flex
			className={classes.background}
			direction={'column'}
			justify={'center'}
			align={'center'}
			w={'100%'}
			h={'100vh'}
		>
			<form onSubmit={form.onSubmit(() => signIn('credentials', form.values))}>
				<Flex
					mb={'5rem'}
					direction={'column'}
					justify={'center'}
					align={'center'}
				>
					<BarmanLogo size={12} padding={1} />
					<Divider w={'100%'} mb={'xl'} />
					<Flex
						className={classes.loginBox}
						bg={'whitesmoke'}
						w={'30rem'}
						h={'12rem'}
						pl={'lg'}
						mb={'3rem'}
					>
						<Flex
							justify={'center'}
							align={'center'}
							direction={'row'}
							w={'100%'}
							h={'100%'}
							gap={'lg'}
						>
							<Flex
								direction={'column'}
								justify={'center'}
								h={'100%'}
								w={'100%'}
								gap={'lg'}
							>
								<input
									name="csrfToken"
									type="hidden"
									defaultValue={csrfToken}
								/>
								<TextInput
									name="username"
									placeholder="Enter employee username"
									w={'100%'}
									{...form.getInputProps('username')}
								/>
								<PasswordInput
									name="password"
									placeholder="Enter password"
									w={'100%'}
									{...form.getInputProps('password')}
								/>
							</Flex>
							<Button
								type="submit"
								h={'100%'}
								ml={'md'}
								radius={'0 0.2rem 0.2rem 0'}
							>
								<IconChevronsRight />
							</Button>
						</Flex>
					</Flex>
				</Flex>
			</form>
		</Flex>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	return {
		props: {
			csrfToken: await getCsrfToken(context),
		},
	};
}
