import { Flex } from '@mantine/core';
import Navigation from '~components/SidebarNav/Navigation';
import { ProductsList } from '~products';

export default function Products() {
	return (
		<Flex>
			<Navigation />
			<Flex direction={'column'} p={'1rem'}>
				<ProductsList />
			</Flex>
		</Flex>
	);
}