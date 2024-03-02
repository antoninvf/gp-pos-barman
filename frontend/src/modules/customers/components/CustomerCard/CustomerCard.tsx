import { Flex, Text, Paper } from '@mantine/core';
import { apiHooks } from '~/api';

interface ICustomerCardProps {
	customerUUID?: string | null;
}

export const CustomerCard = ({ ...props }: ICustomerCardProps) => {
	if (!props.customerUUID) return null;

	const { data: currencyData } = apiHooks.useGetConfigurationSettingName({
		params: { settingName: 'currency' },
	});

	const { data: orderData } = apiHooks.useGetCustomerUuidorders({
		params: { uuid: props.customerUUID },
	});

	const { data: totalOrderPrice } = apiHooks.useGetCustomerUuidorderstotal({
		params: { uuid: props.customerUUID },
	});

	return (
		<>
			<Paper w={'100%'} p={'md'} withBorder radius={0} shadow="0">
				{orderData?.map((x) => (
					<Flex key={x.id} justify={'space-between'} align={'center'}>
						<Text>{x.product?.name}</Text>
						<Text c="black">
							{x.product?.price} {currencyData}
						</Text>
					</Flex>
				))}
				<Flex justify={'space-between'} align={'center'}>
					<Text fw={'600'}>Total:</Text>
					<Text fw={'600'}>
						{totalOrderPrice} {currencyData}
					</Text>
				</Flex>
			</Paper>
		</>
	);
};
