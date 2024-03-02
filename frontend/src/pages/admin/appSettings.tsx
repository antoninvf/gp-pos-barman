import { Flex } from '@mantine/core';
import Link from 'next/link';
import Navigation from '~components/SidebarNav/Navigation';
import { ProtectedPage } from '~api';

export default function AppSettings() {
	return (
		<ProtectedPage>
			<Flex>
				<Navigation />
				<Flex direction={'column'} gap={'sm'} p={'1rem'}>
					<Link href="/admin/dev">developer menu</Link>
				</Flex>
			</Flex>
		</ProtectedPage>
	);
}
