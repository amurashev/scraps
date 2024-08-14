import classNames from 'classnames'

import { format } from 'date-fns'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'

export function ConversationCardSkeleton() {
  return (
    <div className={classNames('w-full px-6 pt-3 space-y-3')}>
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
        <div className="flex-grow space-y-2">
          <Skeleton className="h-4 w-[60%]" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
      <div className="w-full h-[1px] bg-border" />
    </div>
  )
}

function ConversationCard({
  firstName,
  lastName,
  avatarUrl,
  textMessage,
  date,
}: {
  firstName: string
  lastName: string
  avatarUrl: string
  textMessage: string
  date: string
}) {
  const formattedDate = format(date, 'HH:mm')
  return (
    <div
      className={classNames(
        'w-full px-6 pt-3 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer space-y-3'
      )}
    >
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <Avatar>
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>AA</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-grow min-w-[1px]">
          <div className="flex items-center space-x-2">
            <div className="font-bold text-1xl flex-grow truncate min-w-[1px]">
              {firstName} {lastName}
            </div>
            <time className="flex-shrink-0 text-xs text-muted-foreground">
              {formattedDate}
            </time>
          </div>
          <p className="text-muted-foreground truncate">{textMessage}</p>
        </div>
      </div>
      <div className="w-full h-[1px] bg-border" />
    </div>
  )
}

export default ConversationCard
