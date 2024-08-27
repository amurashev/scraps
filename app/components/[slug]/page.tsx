'use client'

import Content from './components/content'
import ConversationCardMdx from './mdx/conversation-card.mdx'

const name = 'Conversation Card'
const description =
  'Simple component to use in some messenger applications as chat / conversation card'

export default function Page() {
  return (
    <Content name={name} description={description}>
      <ConversationCardMdx />
    </Content>
  )
}
