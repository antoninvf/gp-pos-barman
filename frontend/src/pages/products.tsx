import { Flex } from '@mantine/core';
import { ProtectedPage } from '~api';
import Navigation from '~components/SidebarNav/Navigation';
import { ProductsList } from '~products';
import { CreateProductButton } from '../modules/products/components/CreateProductButton/CreateProductButton';

export default function Products() {
	return (
		<ProtectedPage>
			<Flex>
				<Navigation />
				<CreateProductButton />
				<Flex direction={'column'} w={'80%'} p={'1rem'}>
					<ProductsList />
				</Flex>
			</Flex>
		</ProtectedPage>
	);
}
