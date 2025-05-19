import { VansTemplate } from "@/modules/vans-techs/vans/templates/vans-template";

export default async function VansPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  
  const page = params.page ? parseInt(params.page as string) : 1;
  const limit = params.limit ? parseInt(params.limit as string) : 20;
  const search = params.search as string | undefined;

  return <VansTemplate page={page} limit={limit} search={search} />;
}
