import Form from './components/form'

export default function Login() {
  return (
    <div className="relative grid md:grid-cols-2 w-full h-full flex-row items-center justify-center">
      <div className="hidden relative h-full flex-col bg-primary p-10 text-white dark:border-r md:flex">
        Hello!
      </div>
      <div className="p-8">
        <div className="space-y-4">
          <h3 className="text-3xl font-bold">Sign in</h3>
          <Form />
        </div>
      </div>
    </div>
  )
}
