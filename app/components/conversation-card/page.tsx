'use client'

import ConversationCard, {
  ConversationCardSkeleton,
} from '@/components/messenger/conversation-card'

import { getRandomUser } from '@/lib/fake-data'

import Content from '../components/content'
import Code from './code.mdx'
import { Card } from '@/components/ui/card'

const user1 = getRandomUser(0, 'male')
const user2 = getRandomUser(0, 'female')
const user3 = getRandomUser(2, 'male')

const userWithLongName = getRandomUser(1, 'male')

const data = {
  index: 'conversation-card',
  name: 'Conversation Card',
  description:
    'Simple component to use in some messenger applications as chat/conversation card',
  mdx: <Code />,
  props: {
    firstName: user1.firstName,
    lastName: user1.lastName,
    avatarUrl: user1.avatarUrl,
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
                firstName={userWithLongName.firstName}
                lastName={userWithLongName.lastName}
                textMessage="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                avatarUrl={userWithLongName.avatarUrl}
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
                firstName={user2.firstName}
                lastName={user2.lastName}
                avatarUrl={user2.avatarUrl}
                textMessage="Yes, agree"
              />
              <ConversationCard
                {...data.props}
                firstName={user1.firstName}
                lastName={user1.lastName}
                avatarUrl={user1.avatarUrl}
                textMessage="I've never seen that, Wow!"
                isSelected
              />
              <ConversationCard
                {...data.props}
                firstName={user3.firstName}
                lastName={user3.lastName}
                avatarUrl={user3.avatarUrl}
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
