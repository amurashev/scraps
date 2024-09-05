import Link from 'next/link'
import { FaChevronLeft } from 'react-icons/fa6'

import Form from './components/form'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function Login() {
  return (
    <main className="relative grid grid-cols-1 md:grid-cols-2 w-full h-[100vh] flex-row items-center justify-center">
      <div className="hidden relative h-full flex-col bg-sky-700 md:p-10 text-white dark:border-r md:flex justify-between">
        <Link href="/">
          <div className="font-bold text-base flex items-center space-x-2">
            <FaChevronLeft /> <span>Return to home page</span>
          </div>
        </Link>
        <Alert>
          <AlertTitle>Hey!</AlertTitle>
          <AlertDescription>
            You can use email: admin@admin.admin, password: admin
          </AlertDescription>
        </Alert>
      </div>
      <div className="p-8 w-full flex-1 flex justify-center">
        <div className="space-y-4 max-w-[400px] flex-1 flex-shrink-0">
          <h3 className="text-3xl font-bold">Sign in</h3>
          <Form />
        </div>
      </div>
    </main>
  )
}
