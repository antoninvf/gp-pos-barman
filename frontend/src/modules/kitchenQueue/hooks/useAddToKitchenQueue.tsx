import { showNotification } from '@mantine/notifications';
import { apiHooks } from '~/api';

interface IUseAddToKitchenQueueSubmit {
	afterSubmit: () => void;
}

export const useAddToKitchenQueue = ({
	afterSubmit,
}: IUseAddToKitchenQueueSubmit) => {
	const { invalidate } = apiHooks.useGetKitchenQueue();

	const { mutate, isLoading } = apiHooks.usePostKitchenQueue(
		{},
		{
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
					message: 'Item has been added to the kitchen queue',
					color: 'green',
					autoClose: 1000,
				});
				await invalidate();
			},
		},
	);

	const submit = async (values: { productID: string; note: string }) => {
		mutate(values);
		afterSubmit();
	};

	return {
		submit,
		isLoading,
	};
};
