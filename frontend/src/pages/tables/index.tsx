import { Button, Flex, Group } from '@mantine/core';
import Link from 'next/link';
import Navigation from '~components/SidebarNav/Navigation';
import { KitchenQueueList } from '~kitchenQueue';
import { CreateTableButton } from '~tables';

export default function Tables() {
	return (
		<Flex>
			<Navigation />
			<CreateTableButton />
			<Flex direction={'column'} w={'100%'} p={'1rem'}>
				tables
			</Flex>
		</Flex>
	);
}
