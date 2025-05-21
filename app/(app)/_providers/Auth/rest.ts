import {
  setAuthToken,
  setSalesChannelId,
  setPublishableApiKey,
} from "@/lib/data/cookies";
import type { User } from "../../../../payload-types";

export const rest = async (
  url: string,
  args?: any,
  options?: RequestInit
): Promise<null | undefined | User> => {
  const method = options?.method || "POST";

  try {
    const res = await fetch(url, {
      method,
      ...(method === "POST" ? { body: JSON.stringify(args) } : {}),
      credentials: "include", // Important for cookie handling
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    });

    const { errors, user, token, exp } = await res.json();

    if (errors) {
      throw new Error(errors[0].message);
    }

    if (res.ok) {
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const maxAge = exp - currentTimestamp;
      await setAuthToken(token, maxAge);

      if (user?.tenants?.[0]?.tenant) {
        const { salesChannelId, publishableApiKey } = user.tenants[0].tenant;
        if (salesChannelId) await setSalesChannelId(salesChannelId, maxAge);
        if (publishableApiKey) {
          await setPublishableApiKey(publishableApiKey, maxAge);
        }
      }

      return user;
    }
  } catch (e: unknown) {
    throw new Error(e as string);
  }
};
