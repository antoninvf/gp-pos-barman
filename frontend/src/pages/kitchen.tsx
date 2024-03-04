import { Flex } from '@mantine/core';
import { ProtectedPage } from '~api';
import Navigation from '~components/Navigation/Navigation';
import { KitchenQueueList } from '~kitchenQueue';

export default function Kitchen() {
	return (
		<ProtectedPage>
			<Flex>
				<Navigation />
				<Flex direction={'column'} p={'1rem'} w={'100%'}>
					<KitchenQueueList />
				</Flex>
			</Flex>
		</ProtectedPage>
	);
}
