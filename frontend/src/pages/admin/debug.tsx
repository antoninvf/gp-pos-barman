import { Button, Flex, Group } from '@mantine/core';
import { AddToKitchenQueue, ClearKitchenQueue } from '~admin';
import { AddProduct } from '~admin/components/AddProduct';
import Navigation from '~components/SidebarNav/Navigation';

export default function Debug() {
	return (
		<Flex>
			<Navigation />
			<Flex direction={'column'} gap={'sm'} p={'1rem'}>
				<AddToKitchenQueue />
				<ClearKitchenQueue />
				<AddProduct />
			</Flex>
		</Flex>
	);
}
