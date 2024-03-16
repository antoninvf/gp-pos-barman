import { showNotification } from '@mantine/notifications';
import { apiHooks, schemas } from '~/api';
import { type z } from 'zod';

interface IUseSetConfigurationValueProps {
	afterSubmit: () => void;
}

export const useSetConfigurationValue = ({
	afterSubmit,
}: IUseSetConfigurationValueProps) => {
	const { invalidate } = apiHooks.useGetKitchenQueue();

	const { mutate, isLoading } = apiHooks.usePutConfiguration(
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
					message: 'Setting has been successfully updated',
					color: 'green',
					autoClose: 1000,
				});
				await invalidate();
			},
		},
	);

	const submit = async (values: z.infer<typeof schemas.ConfigurationModel>) => {
		mutate(values);
		afterSubmit();
	};

	return {
		submit,
		isLoading,
	};
};
