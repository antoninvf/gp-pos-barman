import { Flex } from '@mantine/core';
import { apiHooks } from '~/api';
import { TablesListCard } from '../TablesListCard';

interface ITablesListProps {}

export const TablesList = (props: ITablesListProps) => {
	const { data } = apiHooks.useGetTables();

	return (
		<Flex wrap="wrap" gap={'sm'}>
			{data?.map(({ id }) => {
				return <TablesListCard key={id} tableID={id || 0} />;
			})}
		</Flex>
	);
};
