import { Button, Flex, Group } from '@mantine/core';
import { ProtectedPage } from '~api';
import Navigation from '~components/Navigation/Navigation';
import { useClearCustomers } from '~customers';
import { useClearKitchenQueue } from '~kitchenQueue';

export default function DeveloperMenu() {
	const { submit: clearKitchenQueue } = useClearKitchenQueue({
		afterSubmit: () => {},
	});

	const { submit: clearAllCustomers } = useClearCustomers({
		afterSubmit: () => {},
	});

	return (
		<ProtectedPage>
			<Flex>
				<Navigation />
				<Flex direction={'column'} gap={'sm'} p={'1rem'}>
					<Button onClick={() => clearKitchenQueue()} color="red">
						Clear kitchen queue
					</Button>
					<Button onClick={() => clearAllCustomers()} color="red">
						Clear all customers
					</Button>
				</Flex>
			</Flex>
		</ProtectedPage>
	);
}
