import { Flex } from '@mantine/core';
import Link from 'next/link';
import Navigation from '~components/SidebarNav/Navigation';

export default function AppSettings() {
	return (
		<Flex>
			<Navigation />
			<Flex direction={'column'} gap={'sm'} p={'1rem'}>
				<Link href="/admin/dev">developer menu</Link>
			</Flex>
		</Flex>
	);
}
