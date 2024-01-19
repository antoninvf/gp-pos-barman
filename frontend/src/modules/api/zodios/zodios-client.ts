import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { ZodiosHooks } from "@zodios/react";
import { env } from "~/env";

import { z } from "zod";

export const KitchenQueueEntity = z
  .object({
    uuid: z.string().nullable(),
    productID: z.string().nullable(),
    note: z.string().nullable(),
    timestamp: z.number().int().nullable(),
  })
  .partial();
export const uuid = z.string();
export const CustomerEntity = z
  .object({
    uuid: z.string().nullable(),
    ordered: z.array(z.string()).nullable(),
    internalOrdered: z.string().nullable(),
    tableID: z.string().nullable(),
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
  })
  .partial();
export const TableEntity = z
  .object({
    id: z.number().int().nullable(),
    name: z.string().nullable(),
    roomID: z.string().nullable(),
    positionX: z.number().int(),
    positionY: z.number().int(),
  })
  .partial();

export const schemas = {
  KitchenQueueEntity,
  uuid,
  CustomerEntity,
  ProductEntity,
  TableEntity,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/customers",
    alias: "getCustomers",
    requestFormat: "json",
    response: z.array(CustomerEntity),
  },
  {
    method: "post",
    path: "/customers",
    alias: "postCustomers",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CustomerEntity,
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/customers/:uuid",
    alias: "getCustomersUuid",
    requestFormat: "json",
    parameters: [
      {
        name: "uuid",
        type: "Path",
        schema: uuid,
      },
    ],
    response: CustomerEntity,
  },
  {
    method: "delete",
    path: "/customers/:uuid",
    alias: "deleteCustomersUuid",
    requestFormat: "json",
    parameters: [
      {
        name: "uuid",
        type: "Path",
        schema: uuid,
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/kitchenQueue",
    alias: "getKitchenQueue",
    requestFormat: "json",
    response: z.array(KitchenQueueEntity),
  },
  {
    method: "post",
    path: "/kitchenQueue",
    alias: "postKitchenQueue",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: KitchenQueueEntity,
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/kitchenQueue/:uuid",
    alias: "getKitchenQueueUuid",
    requestFormat: "json",
    parameters: [
      {
        name: "uuid",
        type: "Path",
        schema: uuid,
      },
    ],
    response: KitchenQueueEntity,
  },
  {
    method: "delete",
    path: "/kitchenQueue/:uuid",
    alias: "deleteKitchenQueueUuid",
    requestFormat: "json",
    parameters: [
      {
        name: "uuid",
        type: "Path",
        schema: uuid,
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/kitchenQueue/:uuid/customer",
    alias: "getKitchenQueueUuidcustomer",
    requestFormat: "json",
    parameters: [
      {
        name: "uuid",
        type: "Path",
        schema: uuid,
      },
    ],
    response: CustomerEntity,
  },
  {
    method: "delete",
    path: "/kitchenQueue/clear",
    alias: "deleteKitchenQueueclear",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "get",
    path: "/product/:uuid",
    alias: "getProductUuid",
    requestFormat: "json",
    parameters: [
      {
        name: "uuid",
        type: "Path",
        schema: uuid,
      },
    ],
    response: ProductEntity,
  },
  {
    method: "get",
    path: "/products",
    alias: "getProducts",
    requestFormat: "json",
    response: z.array(ProductEntity),
  },
  {
    method: "post",
    path: "/products",
    alias: "postProducts",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: ProductEntity,
      },
    ],
    response: z.void(),
  },
  {
    method: "delete",
    path: "/products/:id",
    alias: "deleteProductsId",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: uuid,
      },
    ],
    response: z.void(),
  },
  {
    method: "delete",
    path: "/products/clear",
    alias: "deleteProductsclear",
    requestFormat: "json",
    response: z.void(),
  },
  {
    method: "get",
    path: "/table/:id",
    alias: "getTableId",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: uuid,
      },
    ],
    response: TableEntity,
  },
  {
    method: "get",
    path: "/table/:id/customer",
    alias: "getTableIdcustomer",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: uuid,
      },
    ],
    response: z.array(CustomerEntity),
  },
  {
    method: "get",
    path: "/tables",
    alias: "getTables",
    requestFormat: "json",
    response: z.array(TableEntity),
  },
  {
    method: "post",
    path: "/tables",
    alias: "postTables",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: TableEntity,
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/tables/:room",
    alias: "getTablesRoom",
    requestFormat: "json",
    parameters: [
      {
        name: "room",
        type: "Path",
        schema: uuid,
      },
    ],
    response: z.array(TableEntity),
  },
]);

export const api = new Zodios(env.NEXT_PUBLIC_SERVER_URL, endpoints);
export const apiHooks = new ZodiosHooks("barman", api);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
