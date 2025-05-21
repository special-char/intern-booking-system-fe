"use server";

import { redirect } from "next/navigation";
import { getAuthHeaders } from "./cookies";
import { rest } from "@/app/(app)/_providers/Auth/rest";
import { cookies, headers as getHeaders } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";

export async function login(
  extras: { tenantDomain?: string },
  _currentState: unknown,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const tenantDomain = extras.tenantDomain as string;

  try {
    await rest(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/external-users/login`,
      {
        email,
        password,
        tenantDomain,
      }
    );
  } catch (error: unknown) {
    return error instanceof Error ? error.message : "An unknown error occurred";
  }

  redirect("/");
}

export async function logout() {
  const cookieStore = await cookies();
  await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  cookieStore.delete("payload-token");
  redirect("/");
}

export async function refreshAdmin(): Promise<boolean> {
  try {
    const authHeaders = await getAuthHeaders();

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
      return false;
    }

    return true;
  } catch (error: unknown) {
    console.log("error: ", error);
    return false;
  }
}

export async function getUser() {
  const headers = await getHeaders();
  const payload = await getPayload({ config });
  return await payload.auth({ headers });

  // const user = await rest(
  //   `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
  //   {},
  //   {
  //     method: 'GET',
  //   },
  // )
  // return user;
}
