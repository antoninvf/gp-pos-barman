import {
	Button,
	Flex,
	Grid,
	Modal,
	NumberInput,
	TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconCirclePlus } from '@tabler/icons-react';
import { useAddProduct } from '~products/hooks';

export const AddProduct = () => {
	const [opened, { open, close }] = useDisclosure(false);
	const { submit, isLoading } = useAddProduct({
		afterSubmit: () => {
			form.reset();
			close();
		},
	});

	const handleOpen = () => {
		open();
	};

	const formData = [
		{
			key: 'id',
			label: 'Product ID',
			col: 12,
		},
		{
			key: 'name',
			label: 'Product name',
			col: 12,
		},
		{
			key: 'category',
			label: 'Product category',
			col: 12,
		},
		{
			key: 'description',
			label: 'Description',
			col: 12,
		},
		{
			key: 'imageURL',
			label: 'Image URL',
			col: 12,
		},
	] as const;

	const form = useForm<{
		id: string;
		name: string;
		category: string;
		description?: string;
		imageURL?: string;
		price: number;
	}>({
		initialValues: {
			id: '',
			name: '',
			category: '',
			description: '',
			imageURL: '',
			price: 0,
		},
	});

	return (
		<>
			<Button onClick={handleOpen} rightSection={<IconCirclePlus />}>
				Add product
			</Button>

			<Modal
				opened={opened}
				onClose={close}
				padding={'xl'}
				title="Create a new product"
				centered
			>
				<form onSubmit={form.onSubmit((values) => submit(values))}>
					<Grid>
						{formData.map((item) => (
							<Grid.Col span={item.col} key={item.key}>
								<TextInput
									{...form.getInputProps(item.key)}
									placeholder={'Enter ' + item.label}
									label={item.label}
								/>
							</Grid.Col>
						))}
						<Grid.Col span={12} key="price">
							<NumberInput
								{...form.getInputProps('price')}
								placeholder={'Enter price'}
								label={'Enter price'}
							/>
						</Grid.Col>
					</Grid>
					<Flex justify={'right'} mt={'1rem'} gap={'xs'}>
						<Button
							type={'submit'}
							variant={'filled'}
							rightSection={<IconCirclePlus />}
							loading={isLoading}
						>
							Add product
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
