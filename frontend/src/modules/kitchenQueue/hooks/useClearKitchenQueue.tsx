import { showNotification } from '@mantine/notifications';
import { apiHooks } from '~/api';

interface IUseClearKitchenQueueProps {
	afterSubmit: () => void;
}

export const useClearKitchenQueue = ({
	afterSubmit,
}: IUseClearKitchenQueueProps) => {
	const { invalidate } = apiHooks.useGetKitchenQueue();

	const { mutate, isLoading } = apiHooks.useDeleteKitchenQueueclear(
		{},
		{
			onMutate: async () => {
				showNotification({
					title: 'Clearing kitchen queue',
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
					message: 'Kitchen queue has been cleared',
					color: 'green',
					autoClose: 1000,
				});
				await invalidate();
			},
		},
	);

	const submit = async () => {
		mutate(undefined);
		afterSubmit();
	};

	return {
		submit,
		isLoading,
	};
};
