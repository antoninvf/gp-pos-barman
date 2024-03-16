import { showNotification } from '@mantine/notifications';
import { apiHooks } from '~/api';

interface IUseDeleteOrderProps {
	afterSubmit: () => void;
	id: number;
}

export const useDeleteOrder = ({ afterSubmit, id }: IUseDeleteOrderProps) => {
	const { invalidate } = apiHooks.useGetOrders();

	const { mutate, isLoading } = apiHooks.useDeleteOrderId(
		{
			params: { id: id },
		},
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
					message: `Order has been successfully removed`,
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
