import { Code, Flex, Text, Tabs, Title, rem, Box, Card } from '@mantine/core';
import { IconExclamationCircle } from '@tabler/icons-react';
import { useState } from 'react';
import { apiHooks } from '~/api';
import { ProductItem } from '~products';

interface IRoomTabsProps {}

export const RoomTabs = (props: IRoomTabsProps) => {
	const [activeTab, setActiveTab] = useState<string | null>('first');
	const { data: roomData } = apiHooks.useGetTablesrooms();
	const { data: tableData } = apiHooks.useGetTables();

	if (!roomData?.length)
		return (
			<Flex
				w={'100%'}
				align={'center'}
				justify={'center'}
				direction={'column'}
				gap={'sm'}
			>
				<Flex align={'center'} gap={'md'}>
					<IconExclamationCircle size={'4rem'} />
					<Title>No tables created</Title>
				</Flex>
				<Text>
					Please create a table in the <Code>Tables</Code> section
				</Text>
			</Flex>
		);

	return (
		<Flex direction={'column'} p={'1rem'} w={'100%'}>
			<Tabs value={activeTab} onChange={setActiveTab} w={'100%'}>
				<Tabs.List>
					{roomData?.map((room) => (
						<Tabs.Tab key={room} value={room}>
							{room[0].toUpperCase() + room.slice(1)}
						</Tabs.Tab>
					))}
				</Tabs.List>

				{roomData?.map((room) => (
					<Tabs.Panel key={room} value={room} p={'xl'}>
						<Flex gap={'1rem'} wrap={'wrap'}>
							{tableData
								?.filter((table) => table.room === room)
								.map((table) => (
									<Card withBorder key={table.id}>
										{table.name}
									</Card>
								))}
						</Flex>
					</Tabs.Panel>
				))}
			</Tabs>
		</Flex>
	);
};
