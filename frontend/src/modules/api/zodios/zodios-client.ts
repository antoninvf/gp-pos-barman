import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { ZodiosHooks } from "@zodios/react";

import { z } from "zod";

export const KitchenQueueEntity = z
  .object({ productUUID: z.string().nullable(), note: z.string().nullable() })
  .partial();
export const uuid = z.string();
export const ProductEntity = z
  .object({
    name: z.string().nullable(),
    category: z.string().nullable(),
    description: z.string().nullable(),
    imageURL: z.string().nullable(),
    price: z.number().int(),
  })
  .partial();
export const TableEntity = z
  .object({
    id: z.number().int(),
    name: z.string().nullable(),
    room: z.string().nullable(),
    positionX: z.number().int(),
    positionY: z.number().int(),
  })
  .partial();

export const schemas = {
  KitchenQueueEntity,
  uuid,
  ProductEntity,
  TableEntity,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/kitchenQueue",
    alias: "getKitchenQueue",
    requestFormat: "json",
    response: z.void(),
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
    response: z.void(),
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
    response: z.void(),
  },
  {
    method: "get",
    path: "/products",
    alias: "getProducts",
    requestFormat: "json",
    response: z.void(),
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
    method: "get",
    path: "/table/:uuid",
    alias: "getTableUuid",
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
    path: "/tables",
    alias: "getTables",
    requestFormat: "json",
    response: z.void(),
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
    response: z.void(),
  },
]);

export const api = new Zodios(endpoints);
export const apiHooks = new ZodiosHooks("barman", api);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
