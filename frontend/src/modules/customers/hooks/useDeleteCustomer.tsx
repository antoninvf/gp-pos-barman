import { showNotification } from '@mantine/notifications';
import { apiHooks } from '~/api';

interface IUseDeleteCustomerProps {
	afterSubmit: () => void;
	uuid: string;
}

export const useDeleteCustomer = ({
	afterSubmit,
	uuid,
}: IUseDeleteCustomerProps) => {
	const { invalidate } = apiHooks.useGetCustomers();

	const { mutate, isLoading } = apiHooks.useDeleteCustomerUuid(
		{
			params: { uuid: uuid },
		},
		{
			onMutate: async () => {
				showNotification({
					title: 'Finishing up...',
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
					message: 'Finished!',
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
