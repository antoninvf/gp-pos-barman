import { ActionIcon, Flex, Table } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { apiHooks } from '~/api';
import { ProductItem } from '../ProductItem';

interface IProductsListProps {}

export const ProductsList = (props: IProductsListProps) => {
	const { data } = apiHooks.useGetProducts();

	// currency from configuration settings
	const { data: currencyData } = apiHooks.useGetConfigurationSettingName({
		params: { settingName: 'currency' },
	});

	return (
		<Flex wrap="wrap" gap={'sm'}>
			<Table w={'90%'} withTableBorder>
				<Table.Thead bg={'myColor'} c={'white'}>
					<Table.Tr>
						<Table.Th>Product ID</Table.Th>
						<Table.Th>Name</Table.Th>
						<Table.Th>Category</Table.Th>
						<Table.Th>Price</Table.Th>
						<Table.Th>Action</Table.Th>
					</Table.Tr>
				</Table.Thead>
				<Table.Tbody>
					{data?.map(({ id, name, category, price }) => {
						return (
							<ProductItem
								key={id}
								id={id}
								name={name}
								category={category}
								price={price}
								currencyData={currencyData}
							/>
						);
					})}
				</Table.Tbody>
			</Table>
		</Flex>
	);
};
