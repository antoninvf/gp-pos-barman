import { Badge, Card, Flex, Text, Image, Button } from '@mantine/core';
import { useAddToKitchenQueue } from '~kitchenQueue';

interface IProductItemProps {
	id?: string | null;
	name?: string | null;
	category?: string | null;
	description?: string | null;
	imageURL?: string | null;
	price?: number | null;
}

export const ProductItem = ({ ...props }: IProductItemProps) => {
	const { submit, isLoading } = useAddToKitchenQueue({
		afterSubmit: () => {},
	});

	return (
		<Card shadow="sm" padding="lg" radius="sm" withBorder>
			<Flex justify="space-between" align={'start'} gap={'6rem'}>
				<Text fw={600} size="xl">
					{props.name ? props.name : props.id}
				</Text>
				{<Badge color="green">{props.price}</Badge>}
			</Flex>
			<Text size="lg">{props.category}</Text>
			<Image src={props.imageURL} />
			<Text size="lg">{props.description}</Text>
			<Button
				onClick={() => submit({ productID: props.id ?? '', note: 'test note' })}
			>
				test order "{props.id}"
			</Button>
		</Card>
	);
};
