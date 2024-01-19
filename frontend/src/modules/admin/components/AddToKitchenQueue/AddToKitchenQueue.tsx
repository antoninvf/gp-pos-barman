import { Button, Flex, Grid, Modal, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconCirclePlus } from '@tabler/icons-react';
import { useAddToKitchenQueue } from '~kitchenQueue/hooks';

export const AddToKitchenQueue = () => {
	const [opened, { open, close }] = useDisclosure(false);
	const { submit, isLoading } = useAddToKitchenQueue({
		afterSubmit: close,
	});

	const handleOpen = () => {
		open();
	};

	const formData = [
		{
			key: 'productID',
			col: 12,
		},
		{
			key: 'note',
			col: 12,
		},
	] as const;

	const form = useForm<{ productID: string; note: string }>({
		initialValues: {
			productID: '',
			note: '',
		},
	});

	return (
		<>
			<Button onClick={handleOpen} rightSection={<IconCirclePlus />}>
				Add to kitchen queue
			</Button>

			<Modal
				opened={opened}
				onClose={close}
				padding={'xl'}
				title="add something to the kitchen queue"
				centered
			>
				<form onSubmit={form.onSubmit((values) => submit(values))}>
					<Grid>
						{formData.map((item) => (
							<Grid.Col span={item.col} key={item.key}>
								<TextInput
									{...form.getInputProps(item.key)}
									placeholder={item.key}
									label={item.key}
								/>
							</Grid.Col>
						))}
					</Grid>
					<Flex justify={'right'} mt={'1rem'} gap={'xs'}>
						<Button
							type={'submit'}
							variant={'filled'}
							rightSection={<IconCirclePlus />}
							loading={isLoading}
						>
							Add to kitchen queue
						</Button>
						<Button onClick={close} variant="outline">
							Close
						</Button>
					</Flex>
				</form>
			</Modal>
		</>
	);
};
