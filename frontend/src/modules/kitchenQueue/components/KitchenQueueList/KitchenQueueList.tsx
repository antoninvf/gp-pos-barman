import { Flex, Title } from '@mantine/core';
import { IconClockPause } from '@tabler/icons-react';
import { apiHooks } from '~/api';
import { KitchenQueueItem } from '../KitchenQueueItem';

interface IKitchenQueueProps {}

export const KitchenQueueList = (props: IKitchenQueueProps) => {
	const { data } = apiHooks.useGetKitchenQueue();

	if (!data?.length)
		return (
			<Flex
				w={'100%'}
				h={'100%'}
				align={'center'}
				justify={'center'}
				gap={'lg'}
			>
				<IconClockPause size={'4rem'} />
				<Title>No orders right now</Title>
			</Flex>
		);

	return (
		<Flex wrap="wrap" gap={'sm'}>
			{data?.map(({ id, order, timestamp }) => {
				if (!timestamp) return null;
				return (
					<KitchenQueueItem
						key={id}
						id={id}
						order={order}
						timestamp={timestamp}
					/>
				);
			})}
		</Flex>
	);
};
