import { LoginForm } from "@/modules/login/components/login-form";
import { headers } from "next/headers";

export default async function LoginPage() {
  const headersList = await headers();
  const host = headersList.get("x-forwarded-host");
  const tenantDomain = host?.split(":")[0];
  

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm className="w-full" tenantDomain={tenantDomain} />
      </div>
    </div>
  );
}
