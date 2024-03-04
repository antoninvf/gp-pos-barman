import { Flex } from '@mantine/core';
import { ProtectedPage } from '~api';
import Navigation from '~components/Navigation/Navigation';
import { RoomTabs } from '~tables';

export default function Dashboard() {
	return (
		<ProtectedPage>
			<Flex>
				<Navigation />
				<RoomTabs />
			</Flex>
		</ProtectedPage>
	);
}
