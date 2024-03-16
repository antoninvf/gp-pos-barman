import { Flex, Title } from '@mantine/core';
import { apiHooks } from '~/api';
import { ConfigurationItem } from '../ConfigurationItem';

interface IConfigurationListProps {}

export const ConfigurationList = (props: IConfigurationListProps) => {
	const { data } = apiHooks.useGetConfiguration();

	return (
		<Flex gap={'sm'} w={'100%'} direction={'column'}>
			<Title>Application Settings</Title>
			{data?.map(({ id, settingName, value }) => (
				<ConfigurationItem
					key={id}
					id={id || 0}
					settingName={settingName || ''}
					value={value || ''}
				/>
			))}
		</Flex>
	);
};
