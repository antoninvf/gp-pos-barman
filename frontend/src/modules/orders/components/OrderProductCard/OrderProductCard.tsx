import { Flex, Text, Card, BackgroundImage } from '@mantine/core';
import classes from './OrderProductCard.module.css';
import { apiHooks } from '~/api';
import { useCreateOrder } from '~orders/hooks';

interface IOrderProductCardProps {
	id?: string | null;
	currentCustomerUUID?: string | null;
}

export const OrderProductCard = ({ ...props }: IOrderProductCardProps) => {
	const { submit, isLoading } = useCreateOrder({
		afterSubmit: () => {},
	});

	if (!props.id) return null;

	const { data } = apiHooks.useGetProductId({
		params: { id: props.id },
	});

	return (
		<BackgroundImage src={data?.imageURL || ''} radius={'sm'}>
			<Card
				className={classes.card}
				shadow="sm"
				bg={'none'}
				padding="lg"
				h={'10rem'}
				w={'10rem'}
				radius="sm"
				withBorder
				onClick={() => {
					if (props.currentCustomerUUID) {
						submit({
							productID: props.id,
							customerUUID: props.currentCustomerUUID,
						});
					}
				}}
			>
				<Flex
					justify="center"
					align={'center'}
					w={'100%'}
					h={'100%'}
					direction={'column'}
					gap={'xs'}
				>
					<Text
						fw={600}
						ta={'center'}
						size="xl"
						c="white"
						className={classes.text}
					>
						{data?.name}
					</Text>
				</Flex>
			</Card>
		</BackgroundImage>
	);
};
