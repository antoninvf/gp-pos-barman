import { Button, Flex, Grid, Modal, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconCirclePlus, IconTrash } from '@tabler/icons-react';
import { useClearKitchenQueue } from '~kitchenQueue/hooks';

export const ClearKitchenQueue = () => {
	const [opened, { open, close }] = useDisclosure(false);
	const { mutate, isLoading } = useClearKitchenQueue();

	const handleOpen = () => {
		open();
	};

	return (
		<>
			<Button onClick={handleOpen} rightSection={<IconTrash />} color="red">
				Clear kitchen queue
			</Button>

			<Modal
				opened={opened}
				onClose={close}
				padding={'xl'}
				title="Are you sure you want to clear the kitchen queue?"
				centered
			>
				<Flex justify={'right'} mt={'1rem'}>
					<Button
						onClick={() => mutate(undefined)}
						variant={'light'}
						rightSection={<IconCirclePlus />}
						loading={isLoading}
					>
						Clear
					</Button>
					<Button variant="outline" onClick={close}>
						Close
					</Button>
				</Flex>
			</Modal>
		</>
	);
};
