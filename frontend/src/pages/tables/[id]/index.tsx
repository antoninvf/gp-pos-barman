import { Button, Divider, Flex, Paper, Text, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCheck } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { apiHooks, schemas } from '~api';
import Navigation from '~components/SidebarNav/Navigation';
import { useCreateCustomer } from '~customers';
import { type z } from 'zod';

export default function TablesDetail() {
	const router = useRouter();
	const { id } = router.query;

	// check if id is number, if not return to dashboard
	useEffect(() => {
		if (typeof id !== 'string') {
			router.push('/');
		}
	}, [router, id]);

	const { data } = apiHooks.useGetTableId({
		params: { id: Number(id) },
	});

	const { submit, isLoading } = useCreateCustomer({
		afterSubmit: () => {},
	});

	const { data: customerData } = apiHooks.useGetTableIdcustomer({
		params: { id: Number(id) },
	});

	if (data === undefined) return null;

	const buttonStyle = {
		width: '90%',
		height: '3rem',
	};

	return (
		<Flex>
			<Navigation />
			<Flex direction={'column'} w={'100%'} p={'1rem'}>
				insert component for products tabs
				<Text>Name: {data.name}</Text>
				<Text>Room: {data.room}</Text>
			</Flex>
			<Paper shadow="lg" w={'30vh'} h={'100vh'} bg={'white'}>
				<Flex direction={'column'} align={'center'} w={'30vh'} h={'100vh'}>
					<Title py={'lg'} order={1}>
						Table {data.name}
					</Title>
					<Divider w={'95%'} opacity={0.5} />
					<Flex
						mt={'xl'}
						direction={'column'}
						gap={'sm'}
						w={'100%'}
						align={'center'}
					>
						<Button
							onClick={() => submit({ tableID: Number(id) })}
							style={buttonStyle}
							disabled={(customerData?.length || 0) > 0}
						>
							New customer
						</Button>
					</Flex>
					<Flex
						mt={'auto'}
						pb={'lg'}
						direction={'column'}
						gap={'sm'}
						w={'100%'}
						align={'center'}
					>
						<Button
							style={buttonStyle}
							color="green"
							leftSection={<IconCheck />}
						>
							Finish order
						</Button>
					</Flex>
				</Flex>
			</Paper>
		</Flex>
	);
}
