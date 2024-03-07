import {
	Flex,
	Table,
	ActionIcon,
	Modal,
	Button,
	Text,
	Checkbox,
	Grid,
	Select,
	TextInput,
	NumberInput,
	Tooltip,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconCheck, IconEdit, IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { apiHooks, id, type schemas } from '~api';
import { useDeleteProduct, useEditProduct } from '~products/hooks';
import { type z } from 'zod';

interface IProductItemProps {
	id: string;
	name?: string | null;
	category: string;
	description?: string | null;
	imageURL?: string | null;
	price?: number | null;
	sendToKitchenQueue: boolean;
	currencyData?: string | null;
}

export const ProductItem = ({ ...props }: IProductItemProps) => {
	const { data: productCategories } = apiHooks.useGetProductscategories();
	const [openedDelete, { open: openDelete, close: closeDelete }] =
		useDisclosure(false);
	const [openedEdit, { open: openEdit, close: closeEdit }] =
		useDisclosure(false);
	const [checked, setChecked] = useState(false);
	const [checkedSendToKitchen, setCheckedSendToKitchen] = useState(
		props.sendToKitchenQueue,
	);

	const form = useForm<z.infer<typeof schemas.ProductModel>>({
		initialValues: {
			productID: props.id,
			name: props.name,
			category: props.category,
			description: props.description,
			imageURL: props.imageURL || '',
			price: props.price || 0,
			sendToKitchenQueue: props.sendToKitchenQueue,
		},
		validate: (values) => {
			if (!values.productID) {
				return { productID: 'This field is required' };
			} else if (!values.name) {
				return { name: 'This field is required' };
			} else if (!values.category) {
				return { category: 'This field is required' };
			} else if ((values?.productID?.length || 0) < 3) {
				return { productID: 'Product ID must be at least 3 characters long' };
			} else if ((values?.name?.length || 0) < 3) {
				return { name: 'Product name must be at least 3 characters long' };
			} else if ((values?.name?.length || 0) > 100) {
				return { name: 'Product name must be at most 100 characters long' };
			} else if ((values?.description?.length || 0) > 100) {
				return {
					description:
						'Product description must be at most 100 characters long',
				};
			}
			return {};
		},
	});

	const { submit: submitEdit, isLoading: editIsLoading } = useEditProduct({
		afterSubmit: () => {
			closeEdit();
		},
		id: props.id,
	});
	const handleEditOpen = () => {
		openEdit();
	};

	const { submit: submitDelete } = useDeleteProduct({
		afterSubmit: () => {
			closeDelete();
		},
		id: props.id || '',
	});
	const handleDeleteOpen = () => {
		openDelete();
	};

	return (
		<>
			<Table.Tr>
				<Table.Td>{props.id}</Table.Td>
				<Table.Td>{props.name}</Table.Td>
				<Table.Td>
					{props.category[0].toUpperCase()}
					{props.category.slice(1)}
				</Table.Td>
				<Table.Td>
					{props.price} {props.currencyData}
				</Table.Td>
				<Table.Td>
					<Flex gap={'sm'} align={'center'}>
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
				</Table.Td>
			</Table.Tr>

			{/* Edit modal */}
			<Modal
				opened={openedEdit}
				onClose={closeEdit}
				padding={'xl'}
				title="Edit a product"
				centered
			>
				<form onSubmit={form.onSubmit((values) => submitEdit(values))}>
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
							<Tooltip label={"Product ID can't be changed once created"}>
								<TextInput
									label={'Product ID'}
									placeholder={'Enter a product ID'}
									disabled
									{...form.getInputProps('productID')}
								/>
							</Tooltip>
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
									checked={checkedSendToKitchen}
									onClick={() => setCheckedSendToKitchen(!checkedSendToKitchen)}
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
									data={productCategories?.map((cat) => ({
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
							loading={editIsLoading}
						>
							Edit product
						</Button>
					</Flex>
				</form>
			</Modal>

			{/* Delete modal */}
			<Modal
				title="Delete product"
				opened={openedDelete}
				onClose={closeDelete}
				padding={'xl'}
				centered
			>
				<Text>Are you sure you want to delete the product {props?.name}?</Text>
				<Flex justify={'right'} mt={'1rem'} gap={'xs'}>
					<Button
						variant={'filled'}
						color={'red'}
						onClick={() => submitDelete()}
					>
						Delete product
					</Button>
				</Flex>
			</Modal>
		</>
	);
};
