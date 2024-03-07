import { Button, Flex } from '@mantine/core';
import Navigation from '~components/Navigation/Navigation';
import { ProtectedPage } from '~api';
import { useClearCustomers } from '~customers';
import { useClearKitchenQueue } from '~kitchenQueue';

export default function AppSettings() {
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
