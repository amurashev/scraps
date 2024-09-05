import Header from '@/components/layout/header'

import { verifySession } from '@/lib/session'
import { getUserById } from '@/lib/endpoints/auth'

export default async function CommonWithHeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const userId = await verifySession()

  let user

  if (userId) {
    const response = await getUserById({ id: userId })

    if (response.data) {
      user = response.data
    }
  }
  return (
    <>
      <Header user={user} />
      {children}
    </>
  )
}
