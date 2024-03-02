import { Button, Divider, Flex, NavLink, Paper, Text } from '@mantine/core';
import {
	IconBorderAll,
	IconBoxSeam,
	IconCat,
	IconChefHat,
	IconGlassFull,
	IconLogout,
	IconSettings,
} from '@tabler/icons-react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import BarmanLogo from '~components/BarmanLogo/BarmanLogo';

interface NavigationProps {}

export default function Navigation({}: NavigationProps) {
	const session = useSession();

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
			icon: <IconChefHat size={iconSize} stroke={1.5} />,
			label: 'Kitchen',
			href: '/kitchen',
		},
		{
			icon: <IconCat size={iconSize} stroke={1.5} />,
			label: 'Application Settings',
			href: '/admin/appSettings',
		},
	];

	return (
		<Paper shadow="lg" w={'30vh'} h={'100vh'} bg={'white'}>
			<Flex direction={'column'} align={'center'} w={'30vh'} h={'100vh'}>
				<Link href={'/'} style={{ textDecoration: 'none', color: 'black' }}>
					<BarmanLogo size={5} padding={1} />
				</Link>
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
					<Button
						radius={0}
						mt={'sm'}
						onClick={() => signOut()}
						leftSection={<IconLogout size={'1.5rem'} />}
					>
						Sign out
					</Button>
				</Flex>
			</Flex>
		</Paper>
	);
}
