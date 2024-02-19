import { showNotification } from '@mantine/notifications';
import { apiHooks, schemas } from '~/api';
import { type z } from 'zod';

interface IUseAddProductProps {
	afterSubmit: () => void;
}

export const useAddProduct = ({ afterSubmit }: IUseAddProductProps) => {
	const { invalidate } = apiHooks.useGetProducts();

	const { mutate, isLoading } = apiHooks.usePostProduct(
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

	const submit = async (values: z.infer<typeof schemas.ProductModel>) => {
		mutate(values);
		afterSubmit();
	};

	return {
		submit,
		isLoading,
	};
};
