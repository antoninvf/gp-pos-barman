import {
	Badge,
	Box,
	Button,
	Divider,
	Flex,
	Modal,
	Paper,
	Skeleton,
	Text,
	Title,
	Tooltip,
} from '@mantine/core';
import {
	IconCheck,
	IconPrinter,
	IconTemperature,
	IconThermometer,
	IconUserFilled,
} from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { ProtectedPage, apiHooks } from '~api';
import Navigation from '~components/Navigation/Navigation';
import { useCreateCustomer, useDeleteCustomer } from '~customers';
import { useReactToPrint } from 'react-to-print';
import { OrderProductGrid } from '~orders';
import { CustomerCard } from '~customers/components';
import React from 'react';
import ReceiptToPrint from '~components/ReceiptToPrint/ReceiptToPrint';
import { useDisclosure } from '@mantine/hooks';

export default function TablesDetail() {
	const router = useRouter();
	const { id } = router.query;

	const [opened, { open, close }] = useDisclosure(false);
	const handleOpen = () => {
		open();
	};

	const [printed, setPrinted] = useState(false);

	const ref = useRef(null);
	const handlePrint = useReactToPrint({
		content: () => ref.current,
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

	const { data: currencyData } = apiHooks.useGetConfigurationSettingName({
		params: { settingName: 'currency' },
	});

	const { data: totalOrderPrice } = apiHooks.useGetCustomerUuidorderstotal({
		params: { uuid: customerData?.[0]?.uuid || '' },
	});

	const { submit: finish } = useDeleteCustomer({
		afterSubmit: () => {
			router.push('/');
		},
		uuid: customerData?.[0]?.uuid || '',
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
							<Title mt={'lg'} order={1}>
								Table {data?.name}
							</Title>

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
								h={'100%'}
								pb={'md'}
								align={'center'}
							>
								{customerData?.length || 0 > 0 ? (
									<Badge
										style={buttonStyle}
										rightSection={<IconUserFilled size={'1rem'} />}
										radius={'xs'}
										color={'red'}
									>
										TABLE OCCUPIED
									</Badge>
								) : (
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
								)}

								{customerData?.map((x) => (
									<CustomerCard
										key={x.uuid}
										customerUUID={x.uuid}
										currencyData={currencyData}
									/>
								))}
								<Flex
									opacity={customerData?.length || 0 > 0 ? 1 : 0}
									justify={'space-between'}
									align={'center'}
									w={'100%'}
									px={'md'}
								>
									<Text fw={'600'}>Total:</Text>
									<Text fw={'600'} pr={'md'}>
										{totalOrderPrice} {currencyData}
									</Text>
								</Flex>
								<Divider
									w={'95%'}
									hidden={customerData?.length || 0 > 0 ? false : true}
								/>
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
									onClick={() => handleOpen()}
								>
									Close table
								</Button>
							</Flex>
						</Flex>
					</Paper>
				</Flex>
				<ReceiptToPrint
					ref={ref}
					customerUUID={customerData?.[0]?.uuid || ''}
				/>
			</ProtectedPage>

			<Modal
				title={`Confirmation to close table ${data?.name}`}
				size="lg"
				padding="xl"
				centered
				closeButtonProps={{ display: 'none' }}
				opened={opened}
				onClose={close}
			>
				<Flex justify={'center'} align={'center'} direction={'column'}>
					<Text size="lg">Close table {data?.name}?</Text>
					<Text size="lg">
						Customer&apos;s Total:{' '}
						<b>
							{totalOrderPrice} {currencyData}
						</b>
					</Text>
					<Flex justify="center" mt="xl" gap={'sm'}>
						<Tooltip label="Print via thermal printer">
							<Button
								color="blue"
								disabled
								leftSection={<IconTemperature />}
								onClick={() => {
									setPrinted(true);
									handlePrint();
								}}
							>
								Print receipt
							</Button>
						</Tooltip>
						<Tooltip label="Print via normal printer">
							<Button
								color="blue"
								leftSection={<IconPrinter />}
								onClick={() => {
									setPrinted(true);
									handlePrint();
								}}
							>
								Print receipt
							</Button>
						</Tooltip>
						<Tooltip label="Print a receipt before you close the table">
							<Button
								disabled={!printed}
								onClick={() => {
									finish();
								}}
								color="green"
							>
								Close table!
							</Button>
						</Tooltip>
					</Flex>
				</Flex>
			</Modal>
		</>
	);
}
