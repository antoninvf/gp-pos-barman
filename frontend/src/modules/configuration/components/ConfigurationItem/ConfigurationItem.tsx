import { Flex, TextInput, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { type z } from 'zod';
import type { schemas } from '~api';
import { useSetConfigurationValue } from '~configuration/hooks';

interface IConfigurationItemProps {
	id: number;
	settingName: string;
	value: string;
}

export const ConfigurationItem = (props: IConfigurationItemProps) => {
	const form = useForm<z.infer<typeof schemas.ConfigurationModel>>({
		initialValues: {
			settingName: props.settingName,
			value: props.value,
		},
		validate: (values) => {
			if (!values.settingName) {
				return { settingName: 'This field is required' };
			} else if (!values.value) {
				return { value: 'This field is required' };
			}
			return {};
		},
	});

	const { submit, isLoading } = useSetConfigurationValue({
		afterSubmit: () => {
			close();
		},
	});

	return (
		<form onSubmit={form.onSubmit((values) => submit(values))}>
			<Flex direction={'column'} align={'start'} gap={'sm'} w={'100%'}>
				<TextInput
					label={
						props.settingName[0].toUpperCase() +
						props.settingName.slice(1).replace(/_/g, ' ')
					}
					placeholder={
						props.settingName[0].toUpperCase() +
						props.settingName.slice(1).replace(/_/g, ' ')
					}
					{...form.getInputProps('value')}
				/>
				<Button type={'submit'} loading={isLoading}>
					Save
				</Button>
			</Flex>
		</form>
	);
};
