import { ActionIcon, Badge, Card, Flex, Text } from '@mantine/core';
import { IconCheckbox } from '@tabler/icons-react';
import moment from 'moment';
import { apiHooks, schemas } from '~api';
import { useRemoveFromKitchenQueue } from '~kitchenQueue/hooks';
import { type z } from 'zod';

interface IKitchenQueueProps {
	id?: number;
	order?: z.infer<typeof schemas.OrderEntity>;
	timestamp: number;
}

export const KitchenQueueItem = ({ ...props }: IKitchenQueueProps) => {
	const { mutate, isLoading } = useRemoveFromKitchenQueue({
		id: props.id || 0,
	});

	return (
		<Card shadow="sm" padding="lg" radius="sm" withBorder>
			<Flex justify="space-between" align={'start'} gap={'6rem'}>
				<Text fw={600} size="xl">
					{props.order?.product?.name
						? props.order.product?.name
						: props.order?.product?.id}
				</Text>
				<Flex direction={'column'} gap={'0.1rem'}>
					{!props.order?.product?.name && (
						<Badge color="#FF0000">Product error</Badge>
					)}
					{<Badge color="pink">{moment(props.timestamp).fromNow()}</Badge>}
				</Flex>
			</Flex>
			<Flex justify="space-between" align={'end'} gap={'6rem'}>
				<Flex direction={'column'}>
					{(props.order?.notes && (
						<>
							<Text size="lg" mt={'sm'} c="dimmed">
								Note:
							</Text>
							<Text size="lg">{props.order.notes}</Text>
						</>
					)) || (
						<Text size="lg" mt={'sm'} c="dimmed">
							No notes
						</Text>
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
