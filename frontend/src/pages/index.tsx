import { Text, Code, Flex, Group, Tabs, rem } from '@mantine/core';
import { useMove } from '@mantine/hooks';
import { useState } from 'react';
import Navigation from '~components/SidebarNav/Navigation';
import { RoomTabs } from '~tables';

export default function Dashboard() {
	return (
		<Flex>
			<RoomTabs />
			<Navigation />
		</Flex>
	);
}
