import Controller from './controller'

export default function Questionnaire() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 container">
      <div className="z-10 w-full max-w-4xl items-center justify-between font-mono text-sm lg:flex">
        <Controller />
      </div>
    </main>
  )
}
