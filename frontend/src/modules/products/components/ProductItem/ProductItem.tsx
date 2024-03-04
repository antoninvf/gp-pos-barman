import { Flex, Table, ActionIcon, Modal, Button, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useDeleteProduct } from '~products/hooks';

interface IProductItemProps {
	id?: string | null;
	name?: string | null;
	category?: string | null;
	price?: number | null;
	currencyData?: string | null;
}

export const ProductItem = ({ ...props }: IProductItemProps) => {
	const [openedDelete, { open: openDelete, close: closeDelete }] =
		useDisclosure(false);
	const [checked, setChecked] = useState(false);

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
				<Table.Td>{props.category}</Table.Td>
				<Table.Td>
					{props.price} {props.currencyData}
				</Table.Td>
				<Table.Td>
					<Flex gap={'sm'} align={'center'}>
						<ActionIcon
							size={'2.5rem'}
							onClick={() => alert('fuck ' + props.name)}
						>
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
