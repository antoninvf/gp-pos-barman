import { Flex, Skeleton, Tabs } from '@mantine/core';
import { apiHooks } from '~/api';
import { OrderProductCard } from '../OrderProductCard';
import { useEffect, useState } from 'react';

interface IOrderProductGridProps {
	currentCustomerUUID?: string | null;
}

export const OrderProductGrid = ({ ...props }: IOrderProductGridProps) => {
	const { data } = apiHooks.useGetProducts();
	const { data: categories } = apiHooks.useGetProductscategories();

	const [disabled, setDisabled] = useState(false);
	const [activeTab, setActiveTab] = useState<string | null>(
		categories?.[0] || null,
	);

	useEffect(() => {
		setActiveTab(categories?.[0] || null);
	}, [categories]);

	useEffect(() => {
		if (!props.currentCustomerUUID) {
			setDisabled(true);
		} else {
			setDisabled(false);
		}
	}, [props.currentCustomerUUID]);

	if (!data) return null;

	return (
		<Flex direction={'column'} p={'1rem'} w={'100%'}>
			<Tabs value={activeTab} onChange={setActiveTab} w={'100%'}>
				<Tabs.List>
					{categories?.map((cat) => (
						<Tabs.Tab key={cat} value={cat} disabled={disabled}>
							{cat[0].toUpperCase() + cat.slice(1)}
						</Tabs.Tab>
					))}
				</Tabs.List>

				{categories?.map((cat) => (
					<Tabs.Panel key={cat} value={cat} p={'xl'}>
						<Flex gap={'1rem'} wrap={'wrap'}>
							{data
								?.filter((product) => product.category === cat)
								.map((prod) => (
									<Skeleton
										key={prod.id}
										visible={disabled}
										animate={false}
										w={'10rem'}
										h={'10rem'}
									>
										<OrderProductCard
											key={prod.id}
											id={prod.id}
											currentCustomerUUID={props.currentCustomerUUID}
										/>
									</Skeleton>
								))}
						</Flex>
					</Tabs.Panel>
				))}
			</Tabs>
		</Flex>
	);
};
