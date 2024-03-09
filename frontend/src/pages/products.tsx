import { Flex, ScrollArea } from '@mantine/core';
import { ProtectedPage } from '~api';
import Navigation from '~components/Navigation/Navigation';
import { ProductsList } from '~products';
import { CreateProductButton } from '../modules/products/components/CreateProductButton/CreateProductButton';

export default function Products() {
	return (
		<ProtectedPage>
			<Flex>
				<Navigation />
				<Flex direction={'column'} w={'100%'} p={'1rem'}>
					<CreateProductButton />
					<ProductsList />
				</Flex>
			</Flex>
		</ProtectedPage>
	);
}
