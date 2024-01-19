import { showNotification } from '@mantine/notifications';
import { apiHooks } from '~/api';

interface UseRemoveFromKitchenQueueProps {
	uuid: string;
	name?: string;
}

export const useRemoveFromKitchenQueue = ({
	uuid,
	name,
}: UseRemoveFromKitchenQueueProps) => {
	const { invalidate } = apiHooks.useGetKitchenQueue();

	if (!name) name = '';

	const { mutate, isLoading } = apiHooks.useDeleteKitchenQueueUuid(
		{ params: { uuid } },
		{
			onMutate: async () => {
				showNotification({
					title: `Removing ${name} from kitchen queue`,
					message: '',
					color: 'blue',
					autoClose: 1000,
					loading: true,
				});
				await invalidate();
			},

			onError: async (err) => {
				showNotification({
					title: 'Error',
					message: err.message,
					color: 'red',
					autoClose: 2000,
				});
				console.log(err);
			},

			onSuccess: async () => {
				showNotification({
					title: 'Success',
					message: `Successfully removed ${name} from kitchen queue`,
					color: 'green',
					autoClose: 1000,
				});
				await invalidate();
			},
		},
	);

	return {
		mutate,
		isLoading,
	};
};
