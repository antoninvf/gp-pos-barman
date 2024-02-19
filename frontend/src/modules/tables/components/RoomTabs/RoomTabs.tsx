import { Code, Flex, Text, Tabs, Title, rem, Box, Card } from '@mantine/core';
import { IconExclamationCircle } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { apiHooks } from '~/api';
import { ProductItem } from '~products';
import { TableCard } from '../TableCard';

interface IRoomTabsProps {}

export const RoomTabs = (props: IRoomTabsProps) => {
	const { data: roomData } = apiHooks.useGetTablesrooms();
	const { data: tableData } = apiHooks.useGetTables();

	const [activeTab, setActiveTab] = useState<string | null>(
		roomData?.[0] || null,
	);

	useEffect(() => {
		setActiveTab(roomData?.[0] || null);
	}, [roomData]);

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
									<TableCard key={table.id} tableID={table.id} />
								))}
						</Flex>
					</Tabs.Panel>
				))}
			</Tabs>
		</Flex>
	);
};
