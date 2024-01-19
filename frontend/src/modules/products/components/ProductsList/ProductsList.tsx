import { Flex } from '@mantine/core';
import { apiHooks } from '~/api';
import { ProductItem } from '~products';

interface IProductsListProps {}

export const ProductsList = (props: IProductsListProps) => {
	const { data } = apiHooks.useGetProducts();

	return (
		<Flex wrap="wrap" gap={'sm'}>
			{data?.map(({ id, name, category, description, imageURL, price }) => {
				return (
					<ProductItem
						key={id}
						id={id}
						name={name}
						category={category}
						description={description}
						imageURL={imageURL}
						price={price}
					/>
				);
			})}
		</Flex>
	);
};
