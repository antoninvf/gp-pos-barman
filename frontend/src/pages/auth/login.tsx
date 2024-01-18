import { useRouter } from 'next/router';
import { useForm } from '@mantine/form';
import {
	Badge,
	Button,
	Flex,
	PasswordInput,
	TextInput,
	Title,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconBottleFilled, IconChevronsRight } from '@tabler/icons-react';
import getConfig from 'next/config';
import classes from '/src/styles/Login.module.css';

const { publicRuntimeConfig } = getConfig();

export default function Login() {
	const router = useRouter();

	const form = useForm({
		initialValues: {
			username: '',
			password: '',
		},
	});

	type FormValues = typeof form.values;

	const handleSubmit = (values: FormValues) => {
		if (values.username === 'admin' && values.password === 'admin') {
			router.push('/');
			showNotification({
				title: 'Success',
				message: 'Successfully logged in',
				color: 'green',
				autoClose: 2000,
			});
		} else {
			showNotification({
				title: 'Error',
				message: 'Invalid username or password',
				color: 'red',
				autoClose: 2000,
			});
		}
	};

	return (
		<Flex
			className={classes.background}
			direction={'column'}
			justify={'center'}
			align={'center'}
			w={'100%'}
			h={'100vh'}
		>
			<form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
				<Flex
					mb={'5rem'}
					direction={'column'}
					justify={'center'}
					align={'center'}
				>
					<Flex align={'center'} ml={'-10rem'}>
						<IconBottleFilled size={'10rem'} />
						<Title size={'12rem'}>Barman</Title>
					</Flex>
					<Flex
						className={classes.loginBox}
						bg={'whitesmoke'}
						w={'25rem'}
						h={'10rem'}
						pl={'lg'}
						mb={'3rem'}
					>
						<Flex
							justify={'center'}
							align={'center'}
							direction={'row'}
							w={'100%'}
							h={'100%'}
							gap={'1rem'}
						>
							<Flex
								direction={'column'}
								justify={'center'}
								h={'100%'}
								w={'100%'}
								gap={'1rem'}
							>
								<TextInput
									placeholder="Enter employee username"
									w={'100%'}
									{...form.getInputProps('username')}
								/>
								<PasswordInput
									placeholder="Enter password"
									w={'100%'}
									{...form.getInputProps('password')}
								/>
							</Flex>
							<Button
								variant="transparent"
								type="submit"
								h={'100%'}
								color="whitesmoke"
								radius={0}
							>
								<IconChevronsRight color="black" />
							</Button>
						</Flex>
					</Flex>
				</Flex>
			</form>
		</Flex>
	);
}
