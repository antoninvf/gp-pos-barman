import { showNotification } from '@mantine/notifications';
import { apiHooks, schemas } from '~/api';
import { type z } from 'zod';

interface IUseCreateProductProps {
	afterSubmit: () => void;
}

export const useCreateProduct = ({ afterSubmit }: IUseCreateProductProps) => {
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
					message: 'Product has been created successfully!',
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
