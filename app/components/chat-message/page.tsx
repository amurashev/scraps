'use client'

import TextMessage from '@/components/messenger/text-message'
import { Card } from '@/components/ui/card'

import Content from '../components/content'
import Code from './code.mdx'

const data = {
  index: 'chat-message',
  name: 'Chat message',
  description: 'Text message component to use in some messenger applications',
  mdx: <Code />,
}

const defaultProps = {
  id: '1',
  firstName: 'John',
  lastName: 'Doe',
  avatarUrl: 'https://xsgames.co/randomusers/assets/avatars/male/1.jpg',
  text: 'Hello! Welcome to our conversation 👋',
  date: new Date(),
  isYour: true,
  isNext: false,
}

const opponentProps = {
  id: '1',
  firstName: 'Michel',
  lastName: 'Vain',
  avatarUrl: 'https://xsgames.co/randomusers/assets/avatars/female/3.jpg',
  isYour: false,
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return <Card className="p-5 space-y-1">{children}</Card>
}

export default function Page() {
  return (
    <Content
      name={data.name}
      description={data.description}
      code={data.mdx}
      component={
        <Wrapper>
          <TextMessage {...defaultProps} />
        </Wrapper>
      }
      cases={[
        {
          title: 'Different user cases',
          jsx: (
            <Wrapper>
              <TextMessage
                {...defaultProps}
                firstName="Pablo"
                avatarUrl="https://xsgames.co/randomusers/assets/avatars/male/2.jpg"
                lastName="Diego José Francisco de Paula Juan Nepomuceno María de los Remedios Cipriano de la Santísima Trinidad Ruiz y Picasso"
                text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
              />
            </Wrapper>
          ),
        },
        {
          title: 'Different statuses',
          jsx: (
            <Wrapper>
              <TextMessage
                {...defaultProps}
                text="Hey!"
                date="2024-08-12T16:15:53+02:00"
                messageStatus="read"
              />
              <TextMessage
                {...defaultProps}
                text="It is me"
                date="2024-08-12T16:16:53+02:00"
                messageStatus="delivered"
                isNext
              />
              <TextMessage
                {...defaultProps}
                text="Have you seen my bag?"
                date="2024-08-12T16:16:53+02:00"
                messageStatus="sent"
                isNext
              />
              <TextMessage
                {...defaultProps}
                text="I can't find it 🤔"
                date="2024-08-12T16:17:53+02:00"
                messageStatus="error"
                isNext
              />
            </Wrapper>
          ),
        },
        {
          title: 'Group of messages',
          jsx: (
            <Wrapper>
              <TextMessage {...defaultProps} />
              <TextMessage {...defaultProps} text="How are you?" isNext />
              <TextMessage
                {...defaultProps}
                text="Do you have any topics to discuss?"
                isNext
              />
            </Wrapper>
          ),
        },
        {
          title: 'Group of opponent messages',
          jsx: (
            <Wrapper>
              <TextMessage
                {...defaultProps}
                {...opponentProps}
                isYour={false}
                text="Hey"
              />
              <TextMessage
                {...defaultProps}
                {...opponentProps}
                text="I just want to say..."
                isYour={false}
                isNext
              />
              <TextMessage
                {...defaultProps}
                {...opponentProps}
                text="Forget"
                isYour={false}
                isNext
              />
            </Wrapper>
          ),
        },
        {
          title: 'Combining of chat messages',
          jsx: (
            <Wrapper>
              <TextMessage
                {...defaultProps}
                text="Hi!"
                messageStatus="read"
                date="2024-08-12T16:15:53+02:00"
              />
              <TextMessage
                {...defaultProps}
                {...opponentProps}
                date="2024-08-12T16:20:53+02:00"
                text="Hi!"
                isYour={false}
              />

              <TextMessage
                {...defaultProps}
                text="I just wanted to ask"
                date="2024-08-12T16:21:53+02:00"
                messageStatus="read"
              />
              <TextMessage
                {...defaultProps}
                text="Where i can find this video with cats?"
                date="2024-08-12T16:21:53+02:00"
                messageStatus="read"
                isNext
              />
              <TextMessage
                {...defaultProps}
                {...opponentProps}
                date="2024-08-12T16:28:53+02:00"
                text="Hmm"
                isYour={false}
              />
              <TextMessage
                {...defaultProps}
                {...opponentProps}
                date="2024-08-12T16:28:54+02:00"
                text="Let me find the link for you 🤔"
                isYour={false}
                isNext
              />
            </Wrapper>
          ),
        },
      ]}
    />
  )
}
