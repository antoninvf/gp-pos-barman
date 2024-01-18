import { Flex, NavLink, Paper } from '@mantine/core';
import { IconGauge, IconToolsKitchen } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import BarmanLogo from '~components/BarmanLogo/BarmanLogo';

export default function Navigation() {
	const router = useRouter();

	const pages = [
		{
			icon: <IconGauge size="1rem" stroke={1.5} />,
			label: 'Dashboard',
			href: '/',
		},
		{
			icon: <IconToolsKitchen size="1rem" stroke={1.5} />,
			label: 'Kitchen',
			href: '/kitchen',
		},
	];

	const adminPages = [
		{
			icon: <IconGauge size="1rem" stroke={1.5} />,
			label: 'debug',
			href: '/admin/debug',
		},
	];

	return (
		<Paper
			component={Flex}
			shadow="lg"
			direction={'column'}
			w={'15vw'}
			h={'100vh'}
			align={'center'}
			bg={'white'}
		>
			<BarmanLogo size={3} padding={1} />
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

			{adminPages.map((link, index) => (
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
		</Paper>
	);
}
