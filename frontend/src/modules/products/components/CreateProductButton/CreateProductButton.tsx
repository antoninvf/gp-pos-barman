import {
	ActionIcon,
	Button,
	Checkbox,
	Flex,
	Grid,
	Modal,
	NumberInput,
	Select,
	TextInput,
	Tooltip,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconCheck, IconPlus } from '@tabler/icons-react';
import { apiHooks, type schemas } from '~api';
import { type z } from 'zod';
import { useState } from 'react';
import { useCreateProduct } from '~products/hooks';

interface ICreateProductButtonProps {}

export const CreateProductButton = (props: ICreateProductButtonProps) => {
	const { data: categoriesData } = apiHooks.useGetProductscategories();
	const [opened, { open, close }] = useDisclosure(false);
	const [checked, setChecked] = useState(false);

	const form = useForm<z.infer<typeof schemas.ProductModel>>({
		initialValues: {
			productID: '',
			name: '',
			category: '',
			description: '',
			imageURL: '',
			price: 0,
			sendToKitchenQueue: true,
		},
		validate: (values) => {
			if (!values.productID) {
				return { productID: 'This field is required' };
			} else if (!values.name) {
				return { name: 'This field is required' };
			} else if (!values.category) {
				return { category: 'This field is required' };
			} else if ((values?.productID?.length || 0) <= 3) {
				return { productID: 'Product ID must be at least 3 characters long' };
			} else if ((values?.name?.length || 0) <= 3) {
				return { name: 'Product name must be at least 3 characters long' };
			} else if ((values?.name?.length || 0) >= 100) {
				return { name: 'Product name must be at most 100 characters long' };
			} else if ((values?.description?.length || 0) >= 100) {
				return {
					description:
						'Product description must be at most 100 characters long',
				};
			}
			return {};
		},
	});

	const { submit, isLoading } = useCreateProduct({
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
			<Tooltip label={'Create a new product'} position={'left'}>
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
				title="Create a new product"
				centered
			>
				<form onSubmit={form.onSubmit((values) => submit(values))}>
					<Grid>
						<Grid.Col span={12}>
							<TextInput
								label={'Product name'}
								placeholder={'Enter a product name'}
								required
								{...form.getInputProps('name')}
							/>
						</Grid.Col>
						<Grid.Col span={12}>
							<TextInput
								label={'Product ID'}
								placeholder={'Enter a product ID'}
								required
								{...form.getInputProps('productID')}
							/>
						</Grid.Col>
						<Grid.Col span={12}>
							<TextInput
								label={'Description'}
								placeholder={'Enter a product description'}
								{...form.getInputProps('description')}
							/>
						</Grid.Col>
						<Grid.Col span={12}>
							<TextInput
								label={'Image URL'}
								placeholder={'Enter a product image URL'}
								{...form.getInputProps('imageURL')}
							/>
						</Grid.Col>
						<Grid.Col span={12}>
							<NumberInput
								label={'Price'}
								placeholder={'Enter a product price'}
								required
								{...form.getInputProps('price')}
							/>
						</Grid.Col>
						<Grid.Col span={12}>
							<Tooltip
								label={
									'If checked, product will be sent to the kitchen queue whenever ordered'
								}
							>
								<Checkbox
									label={'Sendable to kitchen queue?'}
									{...form.getInputProps('sendToKitchenQueue')}
								/>
							</Tooltip>
						</Grid.Col>
						{(checked && (
							<Grid.Col span={12}>
								<TextInput
									label={'New category name'}
									placeholder={'Enter a new category name'}
									required
									{...form.getInputProps('category')}
								/>
							</Grid.Col>
						)) || (
							<Grid.Col span={12}>
								<Select
									data={categoriesData?.map((cat) => ({
										label: cat[0].toUpperCase() + cat.slice(1).toLowerCase(),
										value: cat,
									}))}
									label={'Category'}
									placeholder={'Select a category'}
									required
									{...form.getInputProps('category')}
								/>
							</Grid.Col>
						)}
						<Grid.Col span={12}>
							<Checkbox
								onChange={(event) => setChecked(event.currentTarget.checked)}
								label={'Create a new category?'}
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
							Create product
						</Button>
					</Flex>
				</form>
			</Modal>
		</>
	);
};
