'use client'

import { MDXProvider } from '@mdx-js/react'

import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { Breadcrumbs } from './breadcrumbs'
import { Card } from '@/components/ui/card'

export default function Content({
  name,
  description,
  code,
  component,
  cases,
}: {
  name: string
  description: string
  code: React.ReactNode
  component: React.ReactNode
  cases: {
    title: string
    description?: string
    jsx: React.ReactNode
  }[]
}) {
  return (
    <div className="max-w-full h-auto px-6 py-4 pb-10 space-y-10">
      <div className="space-y-3">
        <Breadcrumbs label={name} />

        <div className="space-y-1">
          <h1 className="font-bold text-3xl">{name}</h1>
          <p className="text-muted-foreground text-base">{description}</p>
        </div>
        <Separator />
      </div>

      <Tabs defaultValue="component" className="">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="component">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="component">
          <Card className="bg-muted p-6">{component}</Card>
        </TabsContent>
        <TabsContent value="code">
          <MDXProvider
            components={{
              /* eslint-disable react/no-unstable-nested-components, jsx-a11y/heading-has-content */
              p: (props) => (
                <p className="text-muted-foreground text-base" {...props} />
              ),
              h1: (props) => <h1 className="font-bold text-3xl" {...props} />,
              h2: (props) => <h2 className="font-bold text-2xl" {...props} />,
              h3: (props) => <h3 className="font-bold text-lg" {...props} />,
              pre: (props) => (
                <div className="px-4 py-4 bg-secondary-foreground dark:bg-secondary rounded-md">
                  <pre>{props.children}</pre>
                </div>
              ),
              ul: (props) => (
                <ul
                  className="list-disc pl-6 text-muted-foreground"
                  {...props}
                />
              ),
              /* eslint-enable react/no-unstable-nested-components, jsx-a11y/heading-has-content */
            }}
          >
            {code}
          </MDXProvider>
        </TabsContent>
      </Tabs>

      <div className="space-y-3">
        <h2 className="font-bold text-2xl">Examples</h2>

        <Separator />

        {cases.length > 0 && (
          <div className="space-y-8 pt-2">
            {cases.map((item) => (
              <div key={item.title} className="space-y-2">
                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  {item.description && (
                    <p className="text-muted-foreground text-base">
                      {item.description}
                    </p>
                  )}
                </div>
                <Card className="p-6 bg-muted">{item.jsx}</Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
