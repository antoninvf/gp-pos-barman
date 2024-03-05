import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { ZodiosHooks } from '@zodios/react';

import { z } from 'zod';

export const TableEntity = z
	.object({
		id: z.number().int().nullable(),
		name: z.string().nullable(),
		room: z.string().nullable(),
	})
	.partial();
export const CustomerEntity = z
	.object({
		uuid: z.string().nullable(),
		table: TableEntity,
		creationTimestamp: z.number().int().nullable(),
	})
	.partial();
export const ProductEntity = z
	.object({
		id: z.string().nullable(),
		name: z.string().nullable(),
		category: z.string().nullable(),
		description: z.string().nullable(),
		imageURL: z.string().nullable(),
		price: z.number().int(),
		sendToKitchenQueue: z.boolean(),
	})
	.partial();
export const OrderEntity = z
	.object({
		id: z.number().int(),
		customer: CustomerEntity,
		product: ProductEntity,
		quantity: z.number().int(),
		timestamp: z.number().int(),
		notes: z.string().nullable(),
	})
	.partial();
export const KitchenQueueEntity = z
	.object({
		id: z.number().int(),
		order: OrderEntity,
		timestamp: z.number().int(),
	})
	.partial();
export const id = z.number().int();
export const id__2 = z.string();
export const ProductModel = z
	.object({
		productID: z.string().nullable(),
		name: z.string().nullable(),
		category: z.string().nullable(),
		description: z.string().nullable(),
		imageURL: z.string().nullable(),
		price: z.number().int(),
		sendToKitchenQueue: z.boolean(),
	})
	.partial();
export const TableModel = z.object({ room: z.string().nullable() }).partial();
export const CustomerModel = z.object({ tableID: z.number().int() }).partial();
export const OrderModel = z
	.object({
		customerUUID: z.string().nullable(),
		productID: z.string().nullable(),
		quantity: z.number().int(),
		notes: z.string().nullable(),
	})
	.partial();
export const UserEntity = z
	.object({
		uuid: z.string().nullable(),
		username: z.string().nullable(),
		password: z.string().nullable(),
	})
	.partial();
export const UserModel = z
	.object({ username: z.string().nullable(), password: z.string().nullable() })
	.partial();
export const ConfigurationEntity = z
	.object({
		id: z.number().int().nullable(),
		settingName: z.string().nullable(),
		value: z.string().nullable(),
	})
	.partial();
export const ConfigurationModel = z
	.object({ settingName: z.string().nullable(), value: z.string().nullable() })
	.partial();

export const schemas = {
	TableEntity,
	CustomerEntity,
	ProductEntity,
	OrderEntity,
	KitchenQueueEntity,
	id,
	id__2,
	ProductModel,
	TableModel,
	CustomerModel,
	OrderModel,
	UserEntity,
	UserModel,
	ConfigurationEntity,
	ConfigurationModel,
};

const endpoints = makeApi([
	{
		method: 'get',
		path: '/configuration',
		alias: 'getConfiguration',
		requestFormat: 'json',
		response: z.array(ConfigurationEntity),
	},
	{
		method: 'post',
		path: '/configuration',
		alias: 'postConfiguration',
		requestFormat: 'json',
		parameters: [
			{
				name: 'body',
				type: 'Body',
				schema: ConfigurationModel,
			},
		],
		response: z.void(),
	},
	{
		method: 'get',
		path: '/configuration/:settingName',
		alias: 'getConfigurationSettingName',
		requestFormat: 'json',
		parameters: [
			{
				name: 'settingName',
				type: 'Path',
				schema: id__2,
			},
		],
		response: z.string(),
	},
	{
		method: 'post',
		path: '/customer',
		alias: 'postCustomer',
		requestFormat: 'json',
		parameters: [
			{
				name: 'body',
				type: 'Body',
				schema: CustomerModel,
			},
		],
		response: z.void(),
	},
	{
		method: 'get',
		path: '/customer/:uuid',
		alias: 'getCustomerUuid',
		requestFormat: 'json',
		parameters: [
			{
				name: 'uuid',
				type: 'Path',
				schema: id__2,
			},
		],
		response: CustomerEntity,
	},
	{
		method: 'delete',
		path: '/customer/:uuid',
		alias: 'deleteCustomerUuid',
		requestFormat: 'json',
		parameters: [
			{
				name: 'uuid',
				type: 'Path',
				schema: id__2,
			},
		],
		response: z.void(),
	},
	{
		method: 'get',
		path: '/customer/:uuid/orders',
		alias: 'getCustomerUuidorders',
		requestFormat: 'json',
		parameters: [
			{
				name: 'uuid',
				type: 'Path',
				schema: id__2,
			},
		],
		response: z.array(OrderEntity),
	},
	{
		method: 'get',
		path: '/customer/:uuid/orders/total',
		alias: 'getCustomerUuidorderstotal',
		requestFormat: 'json',
		parameters: [
			{
				name: 'uuid',
				type: 'Path',
				schema: id__2,
			},
		],
		response: z.number().int(),
	},
	{
		method: 'get',
		path: '/customers',
		alias: 'getCustomers',
		requestFormat: 'json',
		response: z.array(CustomerEntity),
	},
	{
		method: 'delete',
		path: '/customers/clear',
		alias: 'deleteCustomersclear',
		requestFormat: 'json',
		response: z.void(),
	},
	{
		method: 'get',
		path: '/kitchenQueue',
		alias: 'getKitchenQueue',
		requestFormat: 'json',
		response: z.array(KitchenQueueEntity),
	},
	{
		method: 'delete',
		path: '/kitchenQueue/clear',
		alias: 'deleteKitchenQueueclear',
		requestFormat: 'json',
		response: z.void(),
	},
	{
		method: 'get',
		path: '/kitchenQueueItem/:id',
		alias: 'getKitchenQueueItemId',
		requestFormat: 'json',
		parameters: [
			{
				name: 'id',
				type: 'Path',
				schema: id,
			},
		],
		response: KitchenQueueEntity,
	},
	{
		method: 'delete',
		path: '/kitchenQueueItem/:id',
		alias: 'deleteKitchenQueueItemId',
		requestFormat: 'json',
		parameters: [
			{
				name: 'id',
				type: 'Path',
				schema: id,
			},
		],
		response: z.void(),
	},
	{
		method: 'get',
		path: '/kitchenQueueItem/:id/customer',
		alias: 'getKitchenQueueItemIdcustomer',
		requestFormat: 'json',
		parameters: [
			{
				name: 'id',
				type: 'Path',
				schema: id,
			},
		],
		response: CustomerEntity,
	},
	{
		method: 'post',
		path: '/order',
		alias: 'postOrder',
		requestFormat: 'json',
		parameters: [
			{
				name: 'body',
				type: 'Body',
				schema: OrderModel,
			},
		],
		response: z.void(),
	},
	{
		method: 'get',
		path: '/order/:id',
		alias: 'getOrderId',
		requestFormat: 'json',
		parameters: [
			{
				name: 'id',
				type: 'Path',
				schema: id,
			},
		],
		response: OrderEntity,
	},
	{
		method: 'get',
		path: '/order/:id/customer',
		alias: 'getOrderIdcustomer',
		requestFormat: 'json',
		parameters: [
			{
				name: 'id',
				type: 'Path',
				schema: id,
			},
		],
		response: CustomerEntity,
	},
	{
		method: 'get',
		path: '/orders',
		alias: 'getOrders',
		requestFormat: 'json',
		response: z.array(OrderEntity),
	},
	{
		method: 'post',
		path: '/product',
		alias: 'postProduct',
		requestFormat: 'json',
		parameters: [
			{
				name: 'body',
				type: 'Body',
				schema: ProductModel,
			},
		],
		response: z.void(),
	},
	{
		method: 'get',
		path: '/product/:id',
		alias: 'getProductId',
		requestFormat: 'json',
		parameters: [
			{
				name: 'id',
				type: 'Path',
				schema: id__2,
			},
		],
		response: ProductEntity,
	},
	{
		method: 'put',
		path: '/product/:id',
		alias: 'putProductId',
		requestFormat: 'json',
		parameters: [
			{
				name: 'body',
				type: 'Body',
				schema: ProductModel,
			},
			{
				name: 'id',
				type: 'Path',
				schema: id__2,
			},
		],
		response: z.void(),
	},
	{
		method: 'delete',
		path: '/product/:id',
		alias: 'deleteProductId',
		requestFormat: 'json',
		parameters: [
			{
				name: 'id',
				type: 'Path',
				schema: id__2,
			},
		],
		response: z.void(),
	},
	{
		method: 'get',
		path: '/products',
		alias: 'getProducts',
		requestFormat: 'json',
		response: z.array(ProductEntity),
	},
	{
		method: 'get',
		path: '/products/categories',
		alias: 'getProductscategories',
		requestFormat: 'json',
		response: z.array(z.string()),
	},
	{
		method: 'delete',
		path: '/products/clear',
		alias: 'deleteProductsclear',
		requestFormat: 'json',
		response: z.void(),
	},
	{
		method: 'post',
		path: '/table',
		alias: 'postTable',
		requestFormat: 'json',
		parameters: [
			{
				name: 'body',
				type: 'Body',
				schema: TableModel,
			},
		],
		response: z.void(),
	},
	{
		method: 'get',
		path: '/table/:id',
		alias: 'getTableId',
		requestFormat: 'json',
		parameters: [
			{
				name: 'id',
				type: 'Path',
				schema: id,
			},
		],
		response: TableEntity,
	},
	{
		method: 'put',
		path: '/table/:id',
		alias: 'putTableId',
		requestFormat: 'json',
		parameters: [
			{
				name: 'body',
				type: 'Body',
				schema: TableModel,
			},
			{
				name: 'id',
				type: 'Path',
				schema: id,
			},
		],
		response: z.void(),
	},
	{
		method: 'delete',
		path: '/table/:id',
		alias: 'deleteTableId',
		requestFormat: 'json',
		parameters: [
			{
				name: 'id',
				type: 'Path',
				schema: id,
			},
		],
		response: z.void(),
	},
	{
		method: 'get',
		path: '/table/:id/customer',
		alias: 'getTableIdcustomer',
		requestFormat: 'json',
		parameters: [
			{
				name: 'id',
				type: 'Path',
				schema: id,
			},
		],
		response: z.array(CustomerEntity),
	},
	{
		method: 'get',
		path: '/tables',
		alias: 'getTables',
		requestFormat: 'json',
		response: z.array(TableEntity),
	},
	{
		method: 'get',
		path: '/tables/:room',
		alias: 'getTablesRoom',
		requestFormat: 'json',
		parameters: [
			{
				name: 'room',
				type: 'Path',
				schema: id__2,
			},
		],
		response: z.array(TableEntity),
	},
	{
		method: 'get',
		path: '/tables/rooms',
		alias: 'getTablesrooms',
		requestFormat: 'json',
		response: z.array(z.string()),
	},
	{
		method: 'post',
		path: '/user',
		alias: 'postUser',
		requestFormat: 'json',
		parameters: [
			{
				name: 'body',
				type: 'Body',
				schema: UserModel,
			},
		],
		response: z.void(),
	},
	{
		method: 'get',
		path: '/user/:uuid',
		alias: 'getUserUuid',
		requestFormat: 'json',
		parameters: [
			{
				name: 'uuid',
				type: 'Path',
				schema: id__2,
			},
		],
		response: UserEntity,
	},
	{
		method: 'delete',
		path: '/user/:uuid',
		alias: 'deleteUserUuid',
		requestFormat: 'json',
		parameters: [
			{
				name: 'uuid',
				type: 'Path',
				schema: id__2,
			},
		],
		response: z.void(),
	},
	{
		method: 'post',
		path: '/user/login',
		alias: 'postUserlogin',
		requestFormat: 'json',
		parameters: [
			{
				name: 'body',
				type: 'Body',
				schema: UserModel,
			},
		],
		response: UserModel,
	},
	{
		method: 'get',
		path: '/users',
		alias: 'getUsers',
		requestFormat: 'json',
		response: z.array(UserEntity),
	},
]);

export const api = new Zodios(
	process.env.NEXT_PUBLIC_BACKEND_API_URL || '',
	endpoints,
);
export const apiHooks = new ZodiosHooks('barman', api);

api.axios.defaults.headers['X-API-Key'] =
	process.env.NEXT_PUBLIC_BACKEND_API_KEY || '';

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
	return new Zodios(baseUrl, endpoints, options);
}
