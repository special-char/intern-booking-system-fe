"use server";

import { cookies, cookies as nextCookies } from "next/headers";

export interface AuthHeaders {
  authorization: string;
}

export const getAuthHeaders = async (): Promise<AuthHeaders | null> => {
  const cookies = await nextCookies();
  const token = cookies.get("_medusa_jwt")?.value;

  if (!token) {
    throw new Error("No token found");
  }

  return { authorization: `Bearer ${token}` };
};

export const getPayloadAuthHeaders = async (): Promise<AuthHeaders | null> => {
  const cookies = await nextCookies();
  const token = cookies.get("payload-token")?.value;

  if (!token) {
    throw new Error("No token found");
  }

  return { authorization: `Bearer ${token}` };
};

export const setAuthToken = async (token: string, maxAge: number) => {
  const cookies = await nextCookies();
  cookies.set("payload-token", token, {
    maxAge: maxAge,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};

export const getCacheTag = async (tag: string): Promise<string> => {
  try {
    const cookies = await nextCookies();
    const cacheId = cookies.get("_medusa_cache_id")?.value;

    if (!cacheId) {
      return "";
    }

    return `${tag}-${cacheId}`;
  } catch (error) {
    console.error(error);
    return "";
  }
};

export const getCacheOptions = async (
  tag: string
): Promise<{ tags: string[] } | object> => {
  if (typeof window !== "undefined") {
    return {};
  }

  const cacheTag = await getCacheTag(tag);

  if (!cacheTag) {
    return {};
  }

  return { tags: [`${cacheTag}`] };
};

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("_medusa_jwt");
};

export const setSalesChannelId = async (
  salesChannelId: string,
  maxAge: number
) => {
  const cookies = await nextCookies();
  cookies.set("sales-channel-id", salesChannelId, {
    maxAge: maxAge,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};

export const setPublishableApiKey = async (
  publishableApiKey: string,
  maxAge: number
) => {
  const cookies = await nextCookies();
  cookies.set("publishable-api-key", publishableApiKey, {
    maxAge: maxAge,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};

export const getSalesChannelId = async (): Promise<string | undefined> => {
  const cookies = await nextCookies();
  return cookies.get("sales-channel-id")?.value;
};

export const getPublishableApiKey = async (): Promise<string | undefined> => {
  const cookies = await nextCookies();
  return cookies.get("publishable-api-key")?.value;
};
