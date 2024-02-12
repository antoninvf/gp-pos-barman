import { showNotification } from '@mantine/notifications';
import { apiHooks } from '~/api';

interface IUseAddProductProps {
	afterSubmit: () => void;
}

export const useAddProduct = ({ afterSubmit }: IUseAddProductProps) => {
	const { invalidate } = apiHooks.useGetProducts();

	const { mutate, isLoading } = apiHooks.usePostProducts(
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

	const submit = async (values: {
		id: string;
		name: string;
		category: string;
		description?: string;
		imageURL?: string;
		price: number;
	}) => {
		mutate(values);
		afterSubmit();
	};

	return {
		submit,
		isLoading,
	};
};
