'use client'

import ArticleCard, {
  ArticleCardSkeleton,
  ArticleCardProps,
} from '@/components/parts/articles/article-card-v-1'
import { Card } from '@/components/ui/card'

import { getRandomUser, getRandomArticle } from '@/lib/fake-data'

import Content from '../components/content'
import Code from './code.mdx'
import { components } from '../data'

const users = [
  {
    userName: `${getRandomUser(0, 'female').firstName} ${getRandomUser(0, 'female').lastName}`,
    userAvatarUrl: getRandomUser(0, 'female').avatarUrl,
  },
  {
    userName: `${getRandomUser(1, 'male').firstName} ${getRandomUser(1, 'male').lastName}`,
    userAvatarUrl: getRandomUser(1, 'male').avatarUrl,
  },
  {
    userName: `${getRandomUser(2, 'male').firstName} ${getRandomUser(2, 'male').lastName}`,
    userAvatarUrl: getRandomUser(2, 'male').avatarUrl,
  },
  {
    userName: `${getRandomUser(0, 'male').firstName} ${getRandomUser(0, 'male').lastName}`,
    userAvatarUrl: getRandomUser(0, 'male').avatarUrl,
  },
]
const articles = [
  getRandomArticle(0),
  getRandomArticle(1),
  getRandomArticle(2),
  getRandomArticle(3),
]

const defaultProps: ArticleCardProps = {
  title: articles[0].title,
  text: articles[0].text,
  pictureUrl: articles[0].pictureUrl,
  minutesToRead: 6,
  date: new Date(),
  topic: articles[0].topic,
  userName: users[0].userName,
  userAvatarUrl: users[0].userAvatarUrl,
  isLiked: false,
}

const todaySub1Hour = new Date()
todaySub1Hour.setHours(todaySub1Hour.getHours() - 1)

const todaySub1Day = new Date()
todaySub1Day.setDate(todaySub1Day.getDate() - 1)

const todaySub1Week = new Date()
todaySub1Week.setDate(todaySub1Week.getDate() - 7)

function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-3">{children}</div>
}

function ItemWrapper({ children }: { children: React.ReactNode }) {
  return <Card className="w-full">{children}</Card>
}

function EnhancedItem(props: ArticleCardProps) {
  return (
    <ItemWrapper>
      <ArticleCard {...props} />
    </ItemWrapper>
  )
}

export default function Page() {
  const componentIndex = 'article-card-v-1'
  const component = components[componentIndex]

  return (
    <Content
      name={component.name}
      description={component.description}
      code={<Code />}
      component={
        <EnhancedItem
          title={defaultProps.title}
          userName={defaultProps.userName}
          userAvatarUrl={defaultProps.userAvatarUrl}
          pictureUrl={defaultProps.pictureUrl}
          minutesToRead={6}
          date={new Date()}
          text={defaultProps.text}
          topic={defaultProps.topic}
          isLiked
        />
      }
      cases={[
        {
          title: 'Different set of data',
          jsx: (
            <Wrapper>
              <EnhancedItem {...defaultProps} {...articles[1]} {...users[1]} />
              <EnhancedItem
                {...defaultProps}
                {...articles[2]}
                {...users[2]}
                minutesToRead={8}
                date={todaySub1Day}
              />
              <EnhancedItem
                {...defaultProps}
                {...articles[3]}
                {...users[3]}
                minutesToRead={3}
                date={todaySub1Week}
              />
            </Wrapper>
          ),
        },

        {
          title: 'Different sizes',
          jsx: (
            <div className="flex flex-col gap-2">
              <Card className="w-1/2">
                <EnhancedItem {...defaultProps} />
              </Card>
              <Card className="w-3/4">
                <EnhancedItem {...defaultProps} />
              </Card>
              <Card className="w-full">
                <EnhancedItem {...defaultProps} />
              </Card>
            </div>
          ),
        },
        {
          title: 'Skeleton',
          jsx: (
            <Wrapper>
              <ItemWrapper>
                <ArticleCardSkeleton />
              </ItemWrapper>
              <EnhancedItem {...defaultProps} />
            </Wrapper>
          ),
        },
      ]}
    />
  )
}
