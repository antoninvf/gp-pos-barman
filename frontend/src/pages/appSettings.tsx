import { Flex } from '@mantine/core';
import Navigation from '~components/Navigation/Navigation';
import { ProtectedPage } from '~api';
import { ConfigurationList } from '~configuration';

export default function AppSettings() {
	return (
		<ProtectedPage>
			<Flex>
				<Navigation />
				<Flex direction={'column'} gap={'sm'} p={'1rem'}>
					<ConfigurationList />
				</Flex>
			</Flex>
		</ProtectedPage>
	);
}
