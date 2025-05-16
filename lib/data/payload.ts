import { Technician } from "@/payload-types";
import config from "@payload-config";
import { getPayload } from "payload";

export async function getTechnicianIdByUserId(
  userId: string
): Promise<Technician | null> {
  try {
    const payload = await getPayload({ config });

    const data = await payload.find({
      collection: "technicians",
      where: {
        user: {
          equals: userId,
        },
      },
      depth: 0,
    });

    if (data.docs && data.docs.length > 0) {
      return data.docs[0];
    }
    return null;
  } catch (error) {
    console.error("Error fetching technician by user ID:", error);
    return null;
  }
}
