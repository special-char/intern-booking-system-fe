import { Config } from "payload";

export const seed: NonNullable<Config["onInit"]> = async (
  payload
): Promise<void> => {
  // const tenant1 = await payload.create({
  //   collection: "tenants",
  //   data: {
  //     name: "Tenant 1",
  //     slug: "gold",
  //     domain: "gold.localhost",
  //     email: "tenant1@payloadcms.com",
  //   },
  // });

  // const tenant2 = await payload.create({
  //   collection: "tenants",
  //   data: {
  //     name: "Tenant 2",
  //     slug: "silver",
  //     domain: "silver.localhost",
  //     email: "tenant2@payloadcms.com",
  //   },
  // });

  // const tenant3 = await payload.create({
  //   collection: "tenants",
  //   data: {
  //     name: "Tenant 3",
  //     slug: "bronze",
  //     domain: "bronze.localhost",
  //     email: "tenant3@payloadcms.com",
  //   },
  // });

  await payload.create({
    collection: "users",
    data: {
      email: "demo@payloadcms.com",
      password: "demo",
      roles: ["super-admin"],
      name: "super-admin",
    },
  });

  // await payload.create({
  // 	collection: "users",
  // 	data: {
  // 		email: "tenant1@payloadcms.com",
  // 		password: "demo",
  // 		tenants: [
  // 			{
  // 				roles: ["tenant-admin"],
  // 				tenant: tenant1.id,
  // 			},
  // 		],
  // 		name: "tenant1",
  // 	},
  // });

  // await payload.create({
  // 	collection: "users",
  // 	data: {
  // 		email: "tenant2@payloadcms.com",
  // 		password: "demo",
  // 		tenants: [
  // 			{
  // 				roles: ["tenant-admin"],
  // 				tenant: tenant2.id,
  // 			},
  // 		],
  // 		name: "tenant2",
  // 	},
  // });

  // await payload.create({
  // 	collection: "users",
  // 	data: {
  // 		email: "tenant3@payloadcms.com",
  // 		password: "demo",
  // 		tenants: [
  // 			{
  // 				roles: ["tenant-admin"],
  // 				tenant: tenant3.id,
  // 			},
  // 		],
  // 		name: "tenant3",
  // 	},
  // });

  // await payload.create({
  // 	collection: "users",
  // 	data: {
  // 		email: "multi-admin@payloadcms.com",
  // 		password: "demo",
  // 		tenants: [
  // 			{
  // 				roles: ["tenant-admin"],
  // 				tenant: tenant1.id,
  // 			},
  // 			{
  // 				roles: ["tenant-admin"],
  // 				tenant: tenant2.id,
  // 			},
  // 			{
  // 				roles: ["tenant-admin"],
  // 				tenant: tenant3.id,
  // 			},
  // 		],
  // 		name: "multi-admin",
  // 	},
  // });

  // await payload.create({
  //   collection: "pages",
  //   data: {
  //     slug: "home",
  //     tenant: tenant1.id,
  //     title: "Page for Tenant 1",
  //   },
  // });

  // await payload.create({
  // 	collection: "pages",
  // 	data: {
  // 		slug: "home",
  // 		tenant: tenant2.id,
  // 		title: "Page for Tenant 2",
  // 	},
  // });

  // await payload.create({
  // 	collection: "pages",
  // 	data: {
  // 		slug: "home",
  // 		tenant: tenant3.id,
  // 		title: "Page for Tenant 3",
  // 	},
  // });
};
