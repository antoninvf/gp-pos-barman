import { Flex, Text, Card, Badge } from '@mantine/core';
import { IconUserFilled } from '@tabler/icons-react';
import Link from 'next/link';
import { apiHooks } from '~/api';

interface ITableCardProps {
	tableID?: number | null;
}

export const TableCard = ({ ...props }: ITableCardProps) => {
	if (!props.tableID) return null;

	const { data } = apiHooks.useGetTableId({
		params: { id: props.tableID },
	});

	const { data: customerData } = apiHooks.useGetTableIdcustomer({
		params: { id: props.tableID },
	});

	return (
		<Card
			shadow="sm"
			padding="lg"
			h={'9rem'}
			w={'10rem'}
			radius="sm"
			withBorder
			component={Link}
			href={'/tables/' + props.tableID}
		>
			<Flex
				justify="center"
				align={'center'}
				w={'100%'}
				h={'100%'}
				direction={'column'}
				gap={'xs'}
			>
				<Badge
					rightSection={<IconUserFilled size={'1rem'} />}
					radius={'xs'}
					color={customerData?.length || 0 > 0 ? 'red' : 'green'}
				>
					{customerData?.length}
				</Badge>
				<Text fw={600} size="xl">
					{data?.name}
				</Text>
			</Flex>
		</Card>
	);
};
