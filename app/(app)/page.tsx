import { headers as getHeaders } from "next/headers";
import { getPayload } from "payload";
import config from "../../payload.config";

const HomePage = async ({
  params: _paramsPromise,
}: {
  params: Promise<{ slug: string[] }>;
}) => {
  const headers = await getHeaders();
  const payload = await getPayload({ config });
  const { permissions, user } = await payload.auth({ headers });

  console.log(permissions, user);

  return (
    <div>
      <h1>Multi-Tenant Example</h1>
      <p>
        This multi-tenant example allows you to explore multi-tenancy with
        domains and with slugs.
      </p>

      <h2>Domains</h2>
      <p>
        When you visit a tenant by domain, the domain is used to determine the
        tenant.
      </p>
      <p>
        For example, visiting{" "}
        <a href="http://gold.localhost:3000/login">
          http://gold.localhost:3000/login
        </a>{" "}
        will show the tenant with the domain &ldquo;gold.localhost&rdquo;.
      </p>

      <h2>Slugs</h2>
      <p>
        When you visit a tenant by slug, the slug is used to determine the
        tenant.
      </p>
      <p>
        For example, visiting{" "}
        <a href="http://localhost:3000/silver/login">
          http://localhost:3000/silver/login
        </a>{" "}
        will show the tenant with the slug &ldquo;silver&rdquo;.
      </p>
    </div>
  );
};

HomePage.displayName = "HomePage";

export default HomePage;
