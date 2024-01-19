import { Flex, Title } from '@mantine/core';
import { IconBottleFilled } from '@tabler/icons-react';

// prepare props
type BarmanLogoProps = {
	size: number;
	padding?: number;
	hidden?: boolean;
};

export default function BarmanLogo({
	size,
	padding = 0,
	hidden,
}: BarmanLogoProps) {
	if (hidden) {
		return (
			<Flex align={'center'} p={padding * 0.5 + 'rem'}>
				<IconBottleFilled size={size * 0.5 + 'vh'} />
			</Flex>
		);
	}

	return (
		<Flex align={'center'} p={padding + 'rem'} pl={0}>
			<IconBottleFilled size={size + 'vh'} />
			<Title size={size + 'vh'}>Barman</Title>
		</Flex>
	);
}
