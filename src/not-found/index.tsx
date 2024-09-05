import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <div className="grid h-[100vh] w-full items-center justify-center text-center">
      <div>
        <h2 className="text-3xl font-bold">Not Found</h2>
        <p className="text-muted-foreground text-xl">
          Could not find requested resource
        </p>
        <Link href="/" className="text-link mt-2 block">
          Return Home
        </Link>
      </div>
    </div>
  )
}
