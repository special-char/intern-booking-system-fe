"use server";

import { revalidateTag } from "next/cache";
import { sdk } from "../config";
import { getCacheTag, setAuthToken, getAuthHeaders, logout } from "./cookies";

export async function login(_currentState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await sdk.auth
      .login("user", "emailpass", { email, password })
      .then(async (token) => {
        await setAuthToken(token as string);
        const customerCacheTag = await getCacheTag("admin");
        revalidateTag(customerCacheTag);
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log("error: ", error);
    return error.toString();
  }
}

export async function refreshAdmin() {
  const authHeaders = await getAuthHeaders();

  try {
    const admin = await fetch(
      `${process.env.MEDUSA_BACKEND_URL}/auth/token/refresh`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders,
        },
      }
    );

    if (!admin.ok || admin.status === 401) {
      await logout();
      return;
    }

    return true;
  } catch (error: unknown) {
    console.log("error: ", error);
    return;
  }
}
