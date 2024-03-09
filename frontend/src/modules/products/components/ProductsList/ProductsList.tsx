import { ActionIcon, Flex, ScrollArea, Table } from '@mantine/core';
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
			<Table w={'100%'} withTableBorder stickyHeader striped highlightOnHover>
				<ScrollArea h={'90vh'} type="auto">
					<Table.Thead bg={'myColor'} c={'white'}>
						<Table.Tr>
							<Table.Th>Product ID</Table.Th>
							<Table.Th>Name</Table.Th>
							<Table.Th>Category</Table.Th>
							<Table.Th>Price</Table.Th>
							<Table.Th>Info</Table.Th>
							<Table.Th></Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{data?.map(
							({
								id,
								name,
								category,
								price,
								imageURL,
								description,
								sendToKitchenQueue,
							}) => {
								return (
									<>
										<ProductItem
											key={id}
											id={id || ''}
											name={name}
											category={category || ''}
											price={price}
											imageURL={imageURL}
											description={description}
											sendToKitchenQueue={sendToKitchenQueue || false}
											currencyData={currencyData}
										/>
									</>
								);
							},
						)}
					</Table.Tbody>
				</ScrollArea>
			</Table>
		</Flex>
	);
};
