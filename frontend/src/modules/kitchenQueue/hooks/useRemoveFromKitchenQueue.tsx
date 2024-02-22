import { showNotification } from '@mantine/notifications';
import { apiHooks } from '~/api';

interface UseRemoveFromKitchenQueueProps {
	id: number;
}

export const useRemoveFromKitchenQueue = ({
	id,
}: UseRemoveFromKitchenQueueProps) => {
	const { invalidate } = apiHooks.useGetKitchenQueue();

	const { mutate, isLoading } = apiHooks.useDeleteKitchenQueueItemId(
		{ params: { id } },
		{
			onMutate: async () => {
				showNotification({
					title: `Removing from kitchen queue`,
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
					message: `Successfully removed from kitchen queue`,
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
