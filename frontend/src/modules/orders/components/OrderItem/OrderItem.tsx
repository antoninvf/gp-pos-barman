import { ActionIcon, Box, Button, Flex, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCircleX } from '@tabler/icons-react';
import { useDeleteOrder } from '~orders/hooks';

interface IOrderItemProps {
	id: number;
	productName?: string | null;
	productPrice?: number | null;
	currencyData?: string | null;
}

export const OrderItem = ({ ...props }: IOrderItemProps) => {
	const [opened, { open, close }] = useDisclosure(false);
	const handleOpen = () => {
		open();
	};

	const { submit } = useDeleteOrder({
		afterSubmit: () => {},
		id: props.id,
	});

	return (
		<>
			<Flex key={props.id} justify={'space-between'} align={'center'} mr={'sm'}>
				<Text>{props.productName}</Text>
				<Flex align={'end'} gap={'0.1rem'}>
					<Text c="black">
						{props.productPrice} {props.currencyData}
					</Text>
					<ActionIcon
						variant="transparent"
						size={'1.5rem'}
						onClick={() => handleOpen()}
					>
						<IconCircleX color="gray" />
					</ActionIcon>
				</Flex>
			</Flex>

			<Modal
				title="Confirm delete order item"
				size="sm"
				centered
				opened={opened}
				onClose={close}
			>
				<Box p="lg">
					<Text size="lg">
						Are you sure you want to remove {props.productName} from the order?
					</Text>
					<Flex justify="flex-end" mt="lg">
						<Button
							onClick={() => {
								submit();
								close();
							}}
						>
							Remove order from table
						</Button>
					</Flex>
				</Box>
			</Modal>
		</>
	);
};
