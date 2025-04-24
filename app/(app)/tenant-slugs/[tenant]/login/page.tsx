import { Login } from '@/components/payload/Login/client.page'
import React from 'react'


type RouteParams = {
  tenant: string
}

// eslint-disable-next-line no-restricted-exports
export default async function Page({ params: paramsPromise }: { params: Promise<RouteParams> }) {
  const params = await paramsPromise

  return <Login tenantSlug={params.tenant} />
}
