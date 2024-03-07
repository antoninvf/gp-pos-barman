import {
	Flex,
	Text,
	Card,
	Badge,
	Button,
	ActionIcon,
	Modal,
	Grid,
	Checkbox,
	Select,
	TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import {
	IconCheck,
	IconEdit,
	IconTrash,
	IconUserFilled,
} from '@tabler/icons-react';
import { apiHooks, schemas } from '~/api';
import { type z } from 'zod';
import { useState } from 'react';
import { useEditTable, useDeleteTable } from '~tables';

interface ITablesListCardProps {
	tableID: number;
}

export const TablesListCard = ({ ...props }: ITablesListCardProps) => {
	const { data: roomData } = apiHooks.useGetTablesrooms();
	const [openedEdit, { open: openEdit, close: closeEdit }] =
		useDisclosure(false);
	const [openedDelete, { open: openDelete, close: closeDelete }] =
		useDisclosure(false);
	const [checked, setChecked] = useState(false);

	const { data } = apiHooks.useGetTableId({
		params: { id: props.tableID },
	});

	const form = useForm<z.infer<typeof schemas.TableModel>>({
		initialValues: {
			room: data?.room || '',
		},
		validate: (values) => {
			if (checked && !values.room) {
				return { room: 'This field is required' };
			} else if (!checked && !values.room) {
				return { room: 'This field is required' };
			} else if ((values?.room?.length || 0) <= 3) {
				return { room: 'Room name must be at least 3 characters long' };
			} else if ((values?.room?.length || 0) >= 20) {
				return { room: 'Room name must be at most 20 characters long' };
			}
			return {};
		},
	});

	const { data: customerData } = apiHooks.useGetTableIdcustomer({
		params: { id: props.tableID },
	});

	const { submit: submitEdit, isLoading: editIsLoading } = useEditTable({
		afterSubmit: () => {
			closeEdit();
			form.reset();
			setChecked(false);
		},
		tableID: props.tableID || 0,
	});
	const handleEditOpen = () => {
		openEdit();
	};

	const { submit: submitDelete } = useDeleteTable({
		afterSubmit: () => {
			closeDelete();
			form.reset();
		},
		tableID: props.tableID || 0,
	});
	const handleDeleteOpen = () => {
		openDelete();
	};

	return (
		<>
			<Card
				shadow="sm"
				padding="lg"
				h={'10rem'}
				w={'10rem'}
				radius="sm"
				withBorder
			>
				<Flex
					justify="center"
					align={'center'}
					w={'100%'}
					h={'100%'}
					direction={'column'}
					gap={'xs'}
				>
					<Badge
						rightSection={<IconUserFilled size={'1rem'} />}
						radius={'xs'}
						color={customerData?.length || 0 > 0 ? 'red' : 'green'}
					>
						{customerData?.length}
					</Badge>
					<Text fw={600} size="xl">
						{data?.name}
					</Text>
				</Flex>
				<Flex justify={'space-between'} align={'center'} mt={'xs'} px={'sm'}>
					<ActionIcon size={'2.5rem'} onClick={() => handleEditOpen()}>
						<IconEdit size={'1.5rem'} />
					</ActionIcon>
					<ActionIcon
						color="red"
						size={'2.5rem'}
						onClick={() => handleDeleteOpen()}
					>
						<IconTrash size={'1.5rem'} />
					</ActionIcon>
				</Flex>
			</Card>

			{/* Edit modal */}
			<Modal
				title="Edit table"
				opened={openedEdit}
				onClose={closeEdit}
				padding={'xl'}
				centered
			>
				<form
					onSubmit={(event) => {
						event.preventDefault();
						submitEdit(form.values);
					}}
				>
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
							loading={editIsLoading}
						>
							Edit table
						</Button>
					</Flex>
				</form>
			</Modal>

			{/* Delete modal */}
			<Modal
				title="Delete table"
				opened={openedDelete}
				onClose={closeDelete}
				padding={'xl'}
				centered
			>
				<Text>Are you sure you want to delete the table {data?.name}?</Text>
				<Flex justify={'right'} mt={'1rem'} gap={'xs'}>
					<Button
						variant={'filled'}
						color={'red'}
						onClick={() => submitDelete()}
					>
						Delete table
					</Button>
				</Flex>
			</Modal>
		</>
	);
};
