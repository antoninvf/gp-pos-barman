import { Button, Flex, Group } from '@mantine/core';
import Link from 'next/link';
import Navigation from '~components/SidebarNav/Navigation';
import { KitchenQueueList } from '~kitchenQueue';

export default function Tables() {
	return (
		<Flex>
			<Navigation />
			<Flex direction={'column'} p={'1rem'}></Flex>
		</Flex>
	);
}
