import {
	Flex,
	Text,
	Card,
	BackgroundImage,
	Grid,
	Modal,
	TextInput,
	Button,
	Box,
	Tooltip,
} from '@mantine/core';
import classes from './OrderProductCard.module.css';
import { ProductEntity, apiHooks } from '~/api';
import { useCreateOrder } from '~orders/hooks';
import { useDisclosure } from '@mantine/hooks';
import { IconCheck, IconChefHat } from '@tabler/icons-react';
import { useState } from 'react';
import { z } from 'zod';

interface IOrderProductCardProps {
	product: z.infer<typeof ProductEntity>;
	currentCustomerUUID?: string | null;
}

export const OrderProductCard = ({ ...props }: IOrderProductCardProps) => {
	const { submit, isLoading } = useCreateOrder({
		afterSubmit: () => {},
	});
	const [opened, { open, close }] = useDisclosure(false);
	const handleOpen = () => {
		open();
	};

	const [note, setNote] = useState('');

	if (!props.product.id) return null;

	return (
		<>
			<BackgroundImage src={props.product?.imageURL || ''} radius={'sm'}>
				<Card
					className={classes.card}
					shadow="sm"
					bg={'none'}
					padding="lg"
					h={'10rem'}
					w={'10rem'}
					radius="sm"
					withBorder
					onClick={() => handleOpen()}
				>
					{props.product?.sendToKitchenQueue?.toString() == 'true' && (
						<Box pos={'absolute'} bottom={'0.25rem'} right={'0.25rem'}>
							<IconChefHat size={'1.5rem'} fill="white" opacity={'50%'} />
						</Box>
					)}
					<Flex
						justify="center"
						align={'center'}
						w={'100%'}
						h={'100%'}
						direction={'column'}
						gap={'xs'}
					>
						<Text
							fw={600}
							ta={'center'}
							size="xl"
							c="white"
							className={classes.text}
						>
							{props.product?.name}
						</Text>
					</Flex>
				</Card>
			</BackgroundImage>

			<Modal
				opened={opened}
				onClose={close}
				padding={'lg'}
				title={props.product?.name}
				centered
			>
				<Grid>
					<Grid.Col span={12}>
						<Tooltip
							hidden={props.product?.sendToKitchenQueue?.toString() == 'true'}
							label="Notes are only available on items sent to the kitchen"
							openDelay={500}
						>
							<TextInput
								label={'Note'}
								placeholder={'Enter a note for the order'}
								disabled={
									props.product?.sendToKitchenQueue?.toString() == 'false'
								}
								value={note}
								onChange={(e) => setNote(e.currentTarget.value)}
							/>
						</Tooltip>
					</Grid.Col>
				</Grid>
				<Flex justify={'right'} mt={'1rem'} gap={'xs'}>
					<Button
						variant={'filled'}
						rightSection={<IconCheck />}
						loading={isLoading}
						onClick={() => {
							submit({
								productID: props.product.id,
								notes: note,
								customerUUID: props.currentCustomerUUID,
							});
							close();
						}}
					>
						Add to order
					</Button>
				</Flex>
			</Modal>
		</>
	);
};
