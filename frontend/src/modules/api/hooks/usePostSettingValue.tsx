import { showNotification } from '@mantine/notifications';
import { apiHooks, schemas } from '~/api';
import { type z } from 'zod';

interface IUsePostSettingValue {
	afterSubmit: () => void;
}

export const usePostSettingValue = ({ afterSubmit }: IUsePostSettingValue) => {
	const { invalidate } = apiHooks.useGetConfiguration();

	const { mutate, isLoading } = apiHooks.usePostConfiguration(
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
					message: 'Configuration has been successfully set',
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
