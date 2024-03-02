import { Flex } from '@mantine/core';
import { ProtectedPage } from '~api';
import Navigation from '~components/SidebarNav/Navigation';
import { CreateTableButton, TablesList } from '~tables';

export default function Tables() {
	return (
		<ProtectedPage>
			<Flex>
				<Navigation />
				<CreateTableButton />
				<Flex direction={'column'} w={'100%'} p={'1rem'}>
					<TablesList />
				</Flex>
			</Flex>
		</ProtectedPage>
	);
}
