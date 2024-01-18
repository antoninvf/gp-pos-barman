import { Badge, Card, Flex, Group, Text, Tooltip } from '@mantine/core';
import moment from 'moment';

interface IKitchenQueueProps {
	uuid?: string | null;
	productID?: string | null;
	note?: string | null;
	timestamp: number;
}

export const KitchenQueueItem = ({ ...props }: IKitchenQueueProps) => {
	return (
		<Card shadow="sm" padding="lg" radius="sm" withBorder>
			<Flex justify="space-between" align={'center'} gap={'6rem'}>
				<Text fw={500} size="xl">
					{props.productID}
				</Text>
				{<Badge color="pink">{moment(props.timestamp).fromNow()}</Badge>}
			</Flex>

			{props.note && (
				<>
					<Text size="lg" c="dimmed">
						Note:
					</Text>
					<Text size="lg">{props.note}</Text>
				</>
			)}
		</Card>
	);
};
