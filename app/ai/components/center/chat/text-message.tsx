import classNames from 'classnames'
import { format } from 'date-fns'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

function TextMessage({
  id,
  name,
  avatarUrl,
  text,
  date,
  isYour = false,
  isNext = false,
}: {
  id: string
  name: string
  avatarUrl?: string
  text: string
  date: number
  isYour: boolean
  isNext: boolean
}) {
  const formattedDate = format(date, 'HH:mm')
  const isTemp = id.includes('temp')

  return (
    <div
      className={classNames('flex items-start gap-2', {
        'flex-row-reverse': isYour,
        'mt-1': isNext,
        'mt-4': !isNext,
      })}
    >
      {!isNext && (
        <div className="flex-shrink-0">
          <Avatar size={8}>
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
        </div>
      )}
      <div
        className={classNames('space-y-1 flex flex-col min-w-[1px]', {
          'items-start': !isYour,
          'items-end': isYour,
          'pr-[40px]': isNext,
          'opacity-60': isTemp,
        })}
      >
        {!isNext && (
          <div
            className={classNames('flex items-center space-x-2', {
              'justify-end': isYour,
              'justify-start': !isYour,
            })}
          >
            <div className="font-bold text-sm">{name}</div>
            <time className="flex-shrink-0 text-xs text-muted-foreground">
              {formattedDate}
            </time>
          </div>
        )}
        <div className="w-full text-muted-foreground bg-muted rounded-sm p-2">
          <p className="break-words">{text}</p>
        </div>
      </div>
    </div>
  )
}

export default TextMessage
