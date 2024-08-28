'use client'

import ConversationCard, {
  ConversationCardSkeleton,
} from '@/components/messenger/conversation-card'

import Content from '../components/content'
import Code from './code.mdx'
import { Card } from '@/components/ui/card'

const data = {
  index: 'conversation-card',
  name: 'Conversation Card',
  description:
    'Simple component to use in some messenger applications as chat/conversation card',
  mdx: <Code />,
  props: {
    firstName: 'John',
    lastName: 'Doe',
    avatarUrl: 'https://xsgames.co/randomusers/assets/avatars/male/1.jpg',
    textMessage: 'Hello! Welcome to our conversation 👋',
    date: new Date(),
    isYour: false,
  },
}

const today = new Date()
const yesterday = new Date()
yesterday.setDate(yesterday.getDate() - 1)

const weekAgo = new Date()
weekAgo.setDate(weekAgo.getDate() - 7)
weekAgo.setHours(weekAgo.getHours() - 1)

export default function Page() {
  return (
    <Content
      name={data.name}
      description={data.description}
      code={data.mdx}
      component={
        <Card>
          <ConversationCard {...data.props} />
        </Card>
      }
      cases={[
        {
          title: 'Different user data',
          jsx: (
            <Card className="divide-y divide-border">
              <ConversationCard
                {...data.props}
                firstName="Pablo"
                lastName="Diego José Francisco de Paula Juan Nepomuceno María de los Remedios Cipriano de la Santísima Trinidad Ruiz y Picasso"
                textMessage="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                avatarUrl="https://xsgames.co/randomusers/assets/avatars/male/2.jpg"
              />

              <ConversationCard
                {...data.props}
                avatarUrl={undefined}
                textMessage="."
              />
            </Card>
          ),
        },
        {
          title: 'Different message statuses',
          jsx: (
            <Card className="divide-y divide-border">
              <ConversationCard
                {...data.props}
                textMessage="Let me write you something"
                messageStatus="sent"
                isYour
              />
              <ConversationCard
                {...data.props}
                textMessage="Have you received my message?"
                messageStatus="delivered"
                isYour
              />
              <ConversationCard
                {...data.props}
                textMessage="Yes, that was awesome!"
                messageStatus="read"
                isYour
              />
              <ConversationCard
                {...data.props}
                textMessage="I can't sent your message, something wrong with my connection ;("
                messageStatus="error"
                isYour
              />
            </Card>
          ),
        },
        {
          title: 'Different message datetime',
          jsx: (
            <Card className="divide-y divide-border">
              <ConversationCard
                {...data.props}
                textMessage="This message was sent today"
                date={today}
              />
              <ConversationCard
                {...data.props}
                textMessage="This message was sent yesterday"
                date={yesterday}
              />
              <ConversationCard
                {...data.props}
                textMessage="This message was sent week ago"
                date={weekAgo}
              />
            </Card>
          ),
        },
        {
          title: 'Conversation has unread messages',
          jsx: (
            <Card>
              <ConversationCard
                {...data.props}
                numberOfUnread={18}
                isYour={false}
              />
            </Card>
          ),
        },
        {
          title: 'Opponent is typing a message',
          jsx: (
            <Card>
              <ConversationCard {...data.props} isYour={false} isTyping />
            </Card>
          ),
        },
        {
          title: 'When conversation is selected',
          jsx: (
            <Card className="divide-y divide-border">
              <ConversationCard
                {...data.props}
                firstName="Michel"
                lastName="Vain"
                avatarUrl="https://xsgames.co/randomusers/assets/avatars/female/1.jpg"
                textMessage="Yes, agree"
              />
              <ConversationCard
                {...data.props}
                firstName="John"
                lastName="Doe"
                avatarUrl="https://xsgames.co/randomusers/assets/avatars/male/1.jpg"
                textMessage="I've never seen that, Wow!"
                isSelected
              />
              <ConversationCard
                {...data.props}
                firstName="Sam"
                lastName="Cooper"
                avatarUrl="https://xsgames.co/randomusers/assets/avatars/male/4.jpg"
                textMessage="Let's go"
              />
            </Card>
          ),
        },
        {
          title: 'Skeleton',
          description: 'Use this case when real data is not loaded yet',
          jsx: (
            <Card>
              <ConversationCardSkeleton />
            </Card>
          ),
        },
      ]}
    />
  )
}
