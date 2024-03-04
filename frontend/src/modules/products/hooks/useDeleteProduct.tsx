import { showNotification } from '@mantine/notifications';
import { apiHooks, schemas } from '~/api';
import { type z } from 'zod';

interface IUseDeleteProductProps {
	afterSubmit: () => void;
	id: string;
}

export const useDeleteProduct = ({
	afterSubmit,
	id,
}: IUseDeleteProductProps) => {
	const { invalidate } = apiHooks.useGetProducts();

	const { mutate, isLoading } = apiHooks.useDeleteProductId(
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
					message: `Product has been successfully deleted`,
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
