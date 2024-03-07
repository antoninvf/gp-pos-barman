import {
	Badge,
	Button,
	Divider,
	Flex,
	Paper,
	Skeleton,
	Text,
	Title,
} from '@mantine/core';
import { IconCheck, IconUserFilled } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { ProtectedPage, apiHooks } from '~api';
import Navigation from '~components/Navigation/Navigation';
import { useCreateCustomer } from '~customers';
import { CustomerCard } from '../../../modules/customers/components/CustomerCard/CustomerCard';
import { useReactToPrint } from 'react-to-print';
import { OrderProductGrid } from '~orders';

export default function TablesDetail() {
	const router = useRouter();
	const { id } = router.query;

	const contentToPrint = useRef(null);
	const handlePrint = useReactToPrint({
		documentTitle: 'Print This Document',
		onBeforePrint: () => console.log('before printing...'),
		onAfterPrint: () => console.log('after printing...'),
		removeAfterPrint: true,
	});
	// usestate for new customer button
	const [newCustomer, setNewCustomer] = useState(false);

	const { data, isLoading } = apiHooks.useGetTableId({
		params: { id: Number(id) },
	});

	const { submit } = useCreateCustomer({
		afterSubmit: () => {},
	});

	const { data: customerData } = apiHooks.useGetTableIdcustomer({
		params: { id: Number(id) },
	});

	const buttonStyle = {
		width: '90%',
		height: '3rem',
	};

	return (
		<>
			<ProtectedPage>
				<Flex>
					<Navigation />
					<Flex direction={'column'} w={'100%'}>
						<OrderProductGrid
							currentCustomerUUID={customerData?.find((x) => x.uuid)?.uuid}
						/>
					</Flex>
					<Paper
						shadow="lg"
						w={'35vh'}
						h={'100vh'}
						bg={'white'}
						component={Skeleton}
						visible={false}
					>
						<Flex direction={'column'} align={'center'} w={'35vh'} h={'100vh'}>
							<Badge
								mt={'lg'}
								rightSection={<IconUserFilled size={'1rem'} />}
								radius={'xs'}
								color={customerData?.length || 0 > 0 ? 'red' : 'green'}
							>
								{customerData?.length}
							</Badge>
							<Title order={1}>Table {data?.name}</Title>
							<Text pb={'lg'}>
								{data?.room?.[0].toUpperCase()}
								{data?.room?.slice(1)}
							</Text>
							<Divider w={'95%'} opacity={0.5} />
							<Flex
								direction={'column'}
								mt={'sm'}
								gap={'sm'}
								w={'100%'}
								align={'center'}
								ref={contentToPrint}
							>
								<Button
									my={'sm'}
									onClick={() => {
										submit({ tableID: Number(id) });
										setNewCustomer(true);
										setTimeout(() => {
											setNewCustomer(false);
										}, 1000);
									}}
									style={buttonStyle}
									disabled={(customerData?.length || 0) > 0}
									loading={newCustomer}
								>
									New customer
								</Button>

								{customerData?.map((x) => (
									<CustomerCard key={x.uuid} customerUUID={x.uuid} />
								))}
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
									onClick={() => {
										handlePrint(null, () => contentToPrint.current);
									}}
								>
									Finish order
								</Button>
							</Flex>
						</Flex>
					</Paper>
				</Flex>
			</ProtectedPage>
		</>
	);
}
