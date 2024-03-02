import { showNotification } from '@mantine/notifications';
import { apiHooks, schemas } from '~/api';
import { type z } from 'zod';

interface IUseEditTableProps {
	afterSubmit: () => void;
	tableID: number;
}

export const useEditTable = ({ afterSubmit, tableID }: IUseEditTableProps) => {
	const { invalidate } = apiHooks.useGetTables();

	const { mutate, isLoading } = apiHooks.usePutTableId(
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
					message: `Table has been successfully edited`,
					color: 'green',
					autoClose: 1000,
				});
				await invalidate();
			},
		},
	);

	const submit = async (values: z.infer<typeof schemas.TableModel>) => {
		mutate(values);
		afterSubmit();
	};

	return {
		submit,
		isLoading,
	};
};
