'use client'

import { MDXProvider } from '@mdx-js/react'

import { Separator } from '@/components/ui/separator'

import { Breadcrumbs } from './breadcrumbs'
import { CodePreview } from './preview'

export default function Content({
  name,
  description,
  children,
}: {
  name: string
  description: string
  children: any
}) {
  return (
    <div className="max-w-full w-[800px] h-full px-6 py-4 space-y-6">
      <div className="space-y-3">
        <Breadcrumbs label={name} />

        <div className="space-y-1">
          <h1 className="font-bold text-3xl">{name}</h1>
          <p className="text-muted-foreground text-base">{description}</p>
        </div>
      </div>

      <Separator />

      <div className="">
        <MDXProvider
          components={{
            /* eslint-disable react/no-unstable-nested-components, jsx-a11y/heading-has-content */
            p: (props) => (
              <p className="text-muted-foreground text-base" {...props} />
            ),
            h2: (props) => <h2 className="font-bold text-2xl" {...props} />,
            h3: (props) => <h3 className="font-bold text-lg" {...props} />,
            pre: (props) => <CodePreview {...props} />,
            /* eslint-enable react/no-unstable-nested-components, jsx-a11y/heading-has-content */
          }}
        >
          {children}
        </MDXProvider>
      </div>
    </div>
  )
}
