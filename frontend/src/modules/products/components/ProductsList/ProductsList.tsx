import { ActionIcon, Flex, Table } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { apiHooks } from '~/api';
import { ProductItem } from '~products';

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
							<Table.Tr key={id}>
								<Table.Td>{id}</Table.Td>
								<Table.Td>{name}</Table.Td>
								<Table.Td>{category}</Table.Td>
								<Table.Td>
									{price} {currencyData}
								</Table.Td>
								<Table.Td>
									<Flex gap={'sm'} align={'center'}>
										<ActionIcon
											size={'2.5rem'}
											onClick={() => alert('fuck ' + name)}
										>
											<IconEdit size={'1.5rem'} />
										</ActionIcon>
										<ActionIcon
											color="red"
											size={'2.5rem'}
											onClick={() => alert('fuck ' + name)}
										>
											<IconTrash size={'1.5rem'} />
										</ActionIcon>
									</Flex>
								</Table.Td>
							</Table.Tr>
						);
					})}
				</Table.Tbody>
			</Table>
		</Flex>
	);
};
