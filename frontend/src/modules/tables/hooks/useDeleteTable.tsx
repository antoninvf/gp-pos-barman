import { showNotification } from '@mantine/notifications';
import { apiHooks, schemas } from '~/api';
import { type z } from 'zod';

interface IUseDeleteTableProps {
	afterSubmit: () => void;
	tableID: number;
}

export const useDeleteTable = ({
	afterSubmit,
	tableID,
}: IUseDeleteTableProps) => {
	const { invalidate } = apiHooks.useGetTables();

	const { mutate, isLoading } = apiHooks.useDeleteTableId(
		{
			params: { id: tableID },
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
					message: `Table has been successfully deleted`,
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
