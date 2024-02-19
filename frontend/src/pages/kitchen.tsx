import { Flex } from '@mantine/core';
import Navigation from '~components/SidebarNav/Navigation';
import { KitchenQueueList } from '~kitchenQueue';

export default function Kitchen() {
	return (
		<Flex>
			<Flex direction={'column'} p={'1rem'} w={'100%'}>
				<KitchenQueueList />
			</Flex>
			<Navigation />
		</Flex>
	);
}
