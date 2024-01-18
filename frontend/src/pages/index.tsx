import { Button, Flex, Group } from '@mantine/core';
import Link from 'next/link';
import Navigation from '~components/SidebarNav/Navigation';

export default function Home() {
	return (
		<Flex>
			<Navigation />
			<Flex direction={'column'} p={'1rem'}>
				temp dashboard
				<Group>
					<Link href={'/auth/login'}>
						<Button>Log in</Button>
					</Link>
				</Group>
			</Flex>
		</Flex>
	);
}
