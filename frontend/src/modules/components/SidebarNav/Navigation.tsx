import { Divider, Flex, NavLink, Paper } from '@mantine/core';
import {
	IconBorderAll,
	IconBoxSeam,
	IconCat,
	IconChefHat,
	IconGauge,
	IconGlassFull,
	IconToolsKitchen,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import BarmanLogo from '~components/BarmanLogo/BarmanLogo';

interface NavigationProps {}

export default function Navigation({}: NavigationProps) {
	const router = useRouter();
	const iconSize = '2rem';

	const pages = [
		{
			icon: <IconGlassFull size={iconSize} stroke={1.5} />,
			label: 'Dashboard',
			href: '/',
		},
		{
			icon: <IconBoxSeam size={iconSize} stroke={1.5} />,
			label: 'Products',
			href: '/products',
		},
		{
			icon: <IconBorderAll size={iconSize} stroke={1.5} />,
			label: 'Tables',
			href: '/tables',
		},
	];

	const bottomPages = [
		{
			icon: <IconCat size={iconSize} stroke={1.5} />,
			label: 'debug',
			href: '/admin/debug',
		},
		{
			icon: <IconChefHat size={iconSize} stroke={1.5} />,
			label: 'Kitchen',
			href: '/kitchen',
		},
	];

	return (
		<Paper shadow="lg" w={'30vh'} h={'100vh'} bg={'white'}>
			<Flex direction={'column'} align={'center'} w={'30vh'} h={'100vh'}>
				<BarmanLogo size={5} padding={1} />
				<Divider w={'95%'} opacity={0.5} />
				{pages.map((link, index) => (
					<NavLink
						key={index}
						p={'1rem'}
						label={link.label}
						leftSection={link.icon}
						component={Link}
						href={link.href}
						active={router.pathname === link.href}
					></NavLink>
				))}
				<Flex mt={'auto'} direction={'column'} w={'100%'}>
					{bottomPages.map((link, index) => (
						<NavLink
							key={index}
							p={'1rem'}
							label={link.label}
							leftSection={link.icon}
							component={Link}
							href={link.href}
							active={router.pathname === link.href}
						></NavLink>
					))}
				</Flex>
			</Flex>
		</Paper>
	);
}
