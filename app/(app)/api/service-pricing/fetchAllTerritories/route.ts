import { getPayload } from "payload";
import config from "@payload-config";

export async function GET() {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "territory",
    where: {},
  });

  return Response.json(result);
}
