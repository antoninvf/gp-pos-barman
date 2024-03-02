import {
	ActionIcon,
	Button,
	Checkbox,
	Flex,
	Grid,
	Modal,
	Select,
	TextInput,
	Tooltip,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconCheck, IconPlus } from '@tabler/icons-react';
import { apiHooks, type schemas } from '~api';
import { useCreateTable } from '~tables/hooks';
import { type z } from 'zod';
import { useState } from 'react';

interface ICreateTableButtonProps {}

export const CreateTableButton = (props: ICreateTableButtonProps) => {
	const { data: roomData } = apiHooks.useGetTablesrooms();
	const [opened, { open, close }] = useDisclosure(false);
	const [checked, setChecked] = useState(false);

	const form = useForm<z.infer<typeof schemas.TableModel>>({
		initialValues: {
			room: '',
		},
	});

	const { submit, isLoading } = useCreateTable({
		afterSubmit: () => {
			close();
			form.reset();
			setChecked(false);
		},
	});
	const handleOpen = () => {
		open();
	};

	return (
		<>
			<Tooltip label={'Create a new table'} position={'left'}>
				<ActionIcon
					onClick={handleOpen}
					pos={'absolute'}
					top={'2rem'}
					right={'2rem'}
					variant="light"
					size={'4rem'}
					radius={'5rem'}
				>
					<IconPlus stroke={1} size={'2.5rem'} />
				</ActionIcon>
			</Tooltip>

			<Modal
				opened={opened}
				onClose={close}
				padding={'xl'}
				title="Create a new table"
				centered
			>
				<form onSubmit={form.onSubmit((values) => submit(values))}>
					<Grid>
						{(checked && (
							<Grid.Col span={12}>
								<TextInput
									label={'New room name'}
									placeholder={'New room'}
									required
									{...form.getInputProps('room')}
								/>
							</Grid.Col>
						)) || (
							<Grid.Col span={12}>
								<Select
									data={roomData?.map((room) => ({
										label: room[0].toUpperCase() + room.slice(1).toLowerCase(),
										value: room,
									}))}
									label={'Room'}
									placeholder={'Select a room'}
									required
									{...form.getInputProps('room')}
								/>
							</Grid.Col>
						)}
						<Grid.Col span={12}>
							<Checkbox
								onChange={(event) => setChecked(event.currentTarget.checked)}
								label={'Create a new room'}
							/>
						</Grid.Col>
					</Grid>
					<Flex justify={'right'} mt={'1rem'} gap={'xs'}>
						<Button
							type={'submit'}
							variant={'filled'}
							rightSection={<IconCheck />}
							loading={isLoading}
						>
							Create table
						</Button>
					</Flex>
				</form>
			</Modal>
		</>
	);
};
