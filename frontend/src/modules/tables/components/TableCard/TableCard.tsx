import { Flex, Text, Card, Button } from '@mantine/core';
import { apiHooks } from '~/api';

interface ITableCardProps {
	tableID?: number | null;
}

export const TableCard = ({ ...props }: ITableCardProps) => {
	if (!props.tableID) return null;

	const { data } = apiHooks.useGetTableId({
		params: { id: props.tableID },
	});

	return (
		<Card
			shadow="sm"
			padding="lg"
			h={'8rem'}
			w={'10rem'}
			radius="sm"
			bg={'#ff7777'}
			withBorder
		>
			<Flex
				justify="center"
				align={'center'}
				w={'100%'}
				h={'100%'}
				direction={'column'}
			>
				<Text fw={600} size="xl">
					{data?.name}
				</Text>
				<Button>bruh</Button>
			</Flex>
		</Card>
	);
};
