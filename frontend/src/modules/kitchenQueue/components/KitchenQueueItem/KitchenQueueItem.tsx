import { ActionIcon, Badge, Card, Flex, Text } from '@mantine/core';
import { IconCheckbox, IconExclamationCircle } from '@tabler/icons-react';
import moment from 'moment';
import { apiHooks } from '~api';
import { useRemoveFromKitchenQueue } from '~kitchenQueue/hooks';

interface IKitchenQueueProps {
	uuid?: string | null;
	productID?: string | null;
	note?: string | null;
	timestamp: number;
}

export const KitchenQueueItem = ({ ...props }: IKitchenQueueProps) => {
	if (!props.uuid || !props.productID) return null;

	const { data: product } = apiHooks.useGetProductUuid({
		params: { uuid: props.productID },
	});

	const { mutate, isLoading } = useRemoveFromKitchenQueue({
		uuid: props.uuid,
		name: product?.name ? product?.name : props.productID,
	});

	return (
		<Card shadow="sm" padding="lg" radius="sm" withBorder>
			<Flex justify="space-between" align={'start'} gap={'6rem'}>
				<Text fw={600} size="xl">
					{product?.name ? product?.name : props.productID}
				</Text>
				<Flex direction={'column'} gap={'0.1rem'}>
					{!product?.name && <Badge color="#FF0000">Product error</Badge>}
					{<Badge color="pink">{moment(props.timestamp).fromNow()}</Badge>}
				</Flex>
			</Flex>
			<Flex justify="space-between" align={'end'} gap={'6rem'}>
				<Flex direction={'column'}>
					{props.note && (
						<>
							<Text size="lg" mt={'sm'} c="dimmed">
								Note:
							</Text>
							<Text size="lg">{props.note}</Text>
						</>
					)}
				</Flex>
				<ActionIcon
					mt={'auto'}
					mb={0}
					size={'xl'}
					color="green"
					onClick={() => mutate(undefined)}
				>
					<IconCheckbox />
				</ActionIcon>
			</Flex>
		</Card>
	);
};
