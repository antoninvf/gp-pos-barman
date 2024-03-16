import { Paper, Flex, Text, Divider, Title } from '@mantine/core';
import { forwardRef } from 'react';
import { apiHooks } from '~api';
import classes from './ReceiptToPrint.module.css';
import BarmanLogo from '../BarmanLogo/BarmanLogo';
import { IconBottleFilled } from '@tabler/icons-react';

interface ReceiptToPrintProps {
	customerUUID: string;
}

// eslint-disable-next-line react/display-name
const ReceiptToPrint = forwardRef(
	({ ...props }: ReceiptToPrintProps, ref: any) => {
		const { data: orderData } = apiHooks.useGetCustomerUuidorders({
			params: { uuid: props.customerUUID },
		});

		const { data: totalOrderPrice } = apiHooks.useGetCustomerUuidorderstotal({
			params: { uuid: props.customerUUID },
		});

		const { data: currencyData } = apiHooks.useGetConfigurationSettingName({
			params: { settingName: 'currency' },
		});

		const { data: restaurantName } = apiHooks.useGetConfigurationSettingName({
			params: { settingName: 'restaurant_name' },
		});

		const { data: address } = apiHooks.useGetConfigurationSettingName({
			params: { settingName: 'restaurant_address' },
		});

		const { data: phone } = apiHooks.useGetConfigurationSettingName({
			params: { settingName: 'restaurant_phone' },
		});

		const textSize = 'sm';

		return (
			<>
				<Flex
					w={'100%'}
					mih={'100%'}
					p={'md'}
					ref={ref}
					direction={'column'}
					justify={'center'}
					align={'center'}
					className={classes.receipt}
				>
					<Title>{restaurantName}</Title>
					<Text size={textSize}>{address}</Text>
					<Text size={textSize}>{phone}</Text>

					<Flex direction={'column'} w={'75%'} mt={'md'}>
						<Flex justify={'space-between'} align={'center'}>
							<Text size={textSize}>
								Table: {orderData?.[0]?.customer?.table?.name} -{' '}
								{orderData?.[0]?.customer?.table?.room || ''}
							</Text>
							<Text size={textSize}>
								{new Date().toLocaleDateString() +
									' ' +
									new Date().toLocaleTimeString()}
							</Text>
						</Flex>
						<Divider variant="dashed" color={'black'} pb={'sm'} />
						{orderData?.map((x) => (
							<Flex key={x.id} justify={'space-between'} align={'center'}>
								<Text size={textSize}>{x.product?.name}</Text>
								<Text size={textSize}>
									{x.product?.price} {currencyData}
								</Text>
							</Flex>
						))}
					</Flex>
					<Divider
						variant="dashed"
						w={'75%'}
						h={'auto'}
						color={'black'}
						my={'sm'}
						pt={'sm'}
					/>
					<Flex justify={'space-between'} align={'center'} w={'75%'}>
						<Text size={textSize} fw={'600'}>
							Total:
						</Text>
						<Text size={textSize} fw={'600'}>
							{totalOrderPrice} {currencyData}
						</Text>
					</Flex>

					<Flex
						mt={'auto'}
						mb={'md'}
						justify={'space-between'}
						direction={'column'}
						align={'center'}
						gap={'sm'}
					>
						<Text size={textSize}>Thank you for your visit!</Text>
						<Flex align={'center'} pl={0}>
							<IconBottleFilled size={'1.5rem'} />
							<Title order={3}>Barman</Title>
						</Flex>
					</Flex>
				</Flex>
			</>
		);
	},
);

export default ReceiptToPrint;
