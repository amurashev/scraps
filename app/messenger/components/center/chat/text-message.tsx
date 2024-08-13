import classNames from 'classnames'
import { format } from 'date-fns'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const TextMessage = ({
  firstName,
  lastName,
  avatarUrl,
  textMessage,
  date,
  isYour,
}: {
  firstName: string
  lastName: string
  avatarUrl: string
  textMessage: string
  date: string
  isYour: boolean
}) => {
  const formattedDate = format(date, 'HH:mm')

  return (
    <div
      className={classNames('flex items-start gap-2', {
        // 'items-end': !isYour,
        'flex-row-reverse': isYour,
      })}
    >
      <div className="flex-shrink-0">
        <Avatar>
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{'AA'}</AvatarFallback>
        </Avatar>
      </div>
      <div
        className={classNames('space-y-1 flex flex-col', {
          'items-start': !isYour,
          'items-end': isYour,
        })}
      >
        <div
          className={classNames('flex items-center space-x-2', {
            'justify-end': isYour,
            'justify-start': !isYour,
          })}
        >
          <div className="font-bold text-sm">
            {firstName} {lastName}
          </div>
          <time className="flex-shrink-0 text-xs text-muted-foreground">
            {formattedDate}
          </time>
        </div>
        <div className="inline-block text-muted-foreground bg-muted rounded-sm p-2">
          <p className='break-words'>{textMessage}</p>
        </div>
      </div>
    </div>
  )
}

export default TextMessage