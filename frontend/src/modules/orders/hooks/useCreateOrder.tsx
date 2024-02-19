import { showNotification } from '@mantine/notifications';
import { apiHooks, schemas } from '~/api';
import { type z } from 'zod';

interface IUseCreateOrderProps {
	afterSubmit: () => void;
}

export const useCreateOrder = ({ afterSubmit }: IUseCreateOrderProps) => {
	const { invalidate } = apiHooks.useGetKitchenQueue();

	const { mutate, isLoading } = apiHooks.usePostOrder(
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
					message: 'Order has been successfully created',
					color: 'green',
					autoClose: 1000,
				});
				await invalidate();
			},
		},
	);

	const submit = async (values: z.infer<typeof schemas.OrderModel>) => {
		mutate(values);
		afterSubmit();
	};

	return {
		submit,
		isLoading,
	};
};
