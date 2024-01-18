import { Button, Flex, Group } from '@mantine/core';
import { AddToKitchenQueue, ClearKitchenQueue } from '~admin';
import Navigation from '~components/SidebarNav/Navigation';

export default function Debug() {
	return (
		<Flex>
			<Navigation />
			<Flex direction={'row'} gap={'sm'} p={'1rem'}>
				<AddToKitchenQueue />
				<ClearKitchenQueue />
			</Flex>
		</Flex>
	);
}
