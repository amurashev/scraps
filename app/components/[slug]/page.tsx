'use client'

import { components } from '../data/components'
import Content from './components/content'

import ConversationCardMdx from '../data/conversation-card.mdx'

const componentsMdx = {
  'conversation-card': <ConversationCardMdx />,
}

export default function Page({
  params: { slug },
}: {
  params: {
    slug: string
  }
}) {
  const component = components.find((item) => item.index === slug)

  if (!component || !componentsMdx[component.index]) {
    return <div className="p-6">Component not fount</div>
  }

  return (
    <Content name={component.name} description={component.name}>
      {componentsMdx[component.index]}
    </Content>
  )
}
