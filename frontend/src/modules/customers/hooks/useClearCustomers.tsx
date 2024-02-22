import { showNotification } from '@mantine/notifications';
import { apiHooks } from '~/api';

interface IUseClearCustomersProps {
	afterSubmit: () => void;
}

export const useClearCustomers = ({ afterSubmit }: IUseClearCustomersProps) => {
	const { invalidate } = apiHooks.useGetCustomers();

	const { mutate, isLoading } = apiHooks.useDeleteCustomersclear(
		{},
		{
			onMutate: async () => {
				showNotification({
					title: 'Clearing customers',
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
					message: 'Customers have been cleared',
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
