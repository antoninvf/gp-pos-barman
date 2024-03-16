import { Flex, Text, Paper, ScrollArea } from '@mantine/core';
import { apiHooks } from '~/api';
import { OrderItem } from '~orders';

interface ICustomerCardProps {
	customerUUID?: string | null;
	currencyData?: string | null;
}

export const CustomerCard = ({ ...props }: ICustomerCardProps) => {
	if (!props.customerUUID) return null;

	const { data: orderData } = apiHooks.useGetCustomerUuidorders({
		params: { uuid: props.customerUUID },
	});

	return (
		<>
			<Paper
				w={'100%'}
				h={'100%'}
				p={'md'}
				pr={0}
				withBorder
				radius={0}
				shadow="0"
			>
				<ScrollArea w={'100%'} h={'100%'} type="auto" mah={'60vh'}>
					{orderData?.map((x) => (
						<OrderItem
							key={x.id}
							id={x.id || 0}
							productName={x.product?.name || ''}
							productPrice={x.product?.price || 0}
							currencyData={props.currencyData}
						/>
					))}
				</ScrollArea>
			</Paper>
		</>
	);
};
