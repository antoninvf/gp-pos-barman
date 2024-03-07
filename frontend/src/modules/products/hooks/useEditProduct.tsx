import { showNotification } from '@mantine/notifications';
import { apiHooks, schemas } from '~/api';
import { type z } from 'zod';

interface IUseEditProductProps {
	afterSubmit: () => void;
	id: string;
}

export const useEditProduct = ({ afterSubmit, id }: IUseEditProductProps) => {
	const { invalidate } = apiHooks.useGetProducts();

	const { mutate, isLoading } = apiHooks.usePutProductId(
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
					message: `Product has been successfully edited`,
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
