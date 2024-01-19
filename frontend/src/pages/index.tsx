import { Text, Code, Flex, Group, Tabs, rem } from '@mantine/core';
import { useMove } from '@mantine/hooks';
import { useState } from 'react';
import Navigation from '~components/SidebarNav/Navigation';

export default function Home() {
	const [activeTab, setActiveTab] = useState<string | null>('first');

	const [value, setValue] = useState({ x: 0.2, y: 0.6 });
	const { ref, active } = useMove(setValue);

	return (
		<Flex>
			<Navigation />
			<Flex direction={'column'} p={'1rem'} w={'100%'}>
				<Tabs value={activeTab} onChange={setActiveTab} w={'100%'}>
					<Tabs.List>
						<Tabs.Tab value="first">Test move table</Tabs.Tab>
						<Tabs.Tab value="second">Second tab</Tabs.Tab>
					</Tabs.List>

					<Tabs.Panel value="first">
						<Group justify="center">
							<div
								ref={ref}
								style={{
									width: '100%',
									height: rem(500),
									backgroundColor: 'var(--mantine-color-blue-light)',
									position: 'relative',
								}}
							>
								<div
									style={{
										position: 'absolute',
										left: `calc(${value.x * 100}% - ${rem(8)})`,
										top: `calc(${value.y * 100}% - ${rem(8)})`,
										width: rem(16),
										height: rem(16),
										backgroundColor: active
											? 'var(--mantine-color-teal-7)'
											: 'var(--mantine-color-blue-7)',
									}}
								/>
							</div>
						</Group>
						<Text ta="center" mt="sm">
							Values{' '}
							<Code>{`{ x: ${Math.round(value.x * 100)}, y: ${Math.round(
								value.y * 100,
							)} }`}</Code>
						</Text>
					</Tabs.Panel>
					<Tabs.Panel value="second">Second panel</Tabs.Panel>
				</Tabs>
			</Flex>
		</Flex>
	);
}
