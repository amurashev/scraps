'use client'

import { useState } from 'react'
import JsxParser from 'react-jsx-parser'
import { FaEye } from 'react-icons/fa6'
import { onlyText } from 'react-children-utilities'

import { Card } from '@/components/ui/card'
import ConversationCard, {
  ConversationCardSkeleton,
} from '@/components/messenger/conversation-card'

export function CodePreview({ children }: { children?: React.ReactNode }) {
  const [showCode, setShowCode] = useState(false)
  const formattedCodeString = onlyText(children)
  const cleanedCodeString = formattedCodeString.replace(
    />(\s|\n|\r|\t)*?</g,
    '><'
  )
  return (
    <div className="rounded-sm border-border border mb-8 mt-2">
      <div className="bg-muted p-6 rounded-sm">
        <JsxParser
          bindings={{}}
          // @ts-expect-error: JsxParser has mismatched types
          components={{ Card, ConversationCard, ConversationCardSkeleton }}
          jsx={cleanedCodeString}
        />
      </div>
      <div className="border-border border-t">
        <button
          className="text-sm w-full text-center flex justify-center gap-1 items-center text-muted-foreground px-2 py-2 hover:text-black"
          onClick={() => setShowCode(!showCode)}
          type="button"
        >
          <FaEye size="14" />
          {showCode ? 'Hide Code' : 'View Code'}
        </button>
      </div>

      {showCode && (
        <div className="bg-background px-3 py-2 rounded-sm border-border border-t">
          <pre>{children}</pre>
        </div>
      )}
    </div>
  )
}
