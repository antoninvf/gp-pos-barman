import { Flex } from '@mantine/core';
import { apiHooks } from '~/api';
import { KitchenQueueItem } from '~kitchenQueue';

interface IKitchenQueueProps {}

export const KitchenQueueList = (props: IKitchenQueueProps) => {
	const { data } = apiHooks.useGetKitchenQueue();

	return (
		<Flex wrap="wrap" gap={'sm'}>
			{data?.map(({ uuid, productID, note, timestamp }) => {
				if (!timestamp) return null;
				return (
					<KitchenQueueItem
						uuid={uuid}
						productID={productID}
						note={note}
						timestamp={timestamp}
					/>
				);
			})}
		</Flex>
	);
};
