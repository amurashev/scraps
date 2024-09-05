import Header from '@/components/layout/header'

import { verifySession } from '@/lib/session'
import { getUserById } from '@/lib/endpoints/auth'
import UserDataProvider from '@/contexts/user-data'

export default async function CommonWithHeaderLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const userId = await verifySession()

  let user = null

  if (userId) {
    const response = await getUserById({ id: userId })

    if (response.data) {
      user = response.data
    }
  }
  return (
    <UserDataProvider user={user}>
      <Header user={user} />
      {children}
    </UserDataProvider>
  )
}
