import classNames from 'classnames'
import { forwardRef } from 'react'
import { format, isAfter, isBefore, sub } from 'date-fns'
import { RiCheckFill, RiAlertFill, RiCheckDoubleFill } from 'react-icons/ri'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'

export const ConversationCardSkeleton = forwardRef<HTMLDivElement>(
  function ConversationCardSkeleton(_, ref) {
    return (
      <div ref={ref} className={classNames('w-full px-6 py-3 space-y-3')}>
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
          <div className="flex-grow space-y-2">
            <Skeleton className="h-4 w-[60%]" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>
      </div>
    )
  }
)

interface ConversationCardProps {
  /**
   * First name of user.
   */
  firstName: string
  /**
   * Last name of user.
   */
  lastName: string
  /**
   * Scr of user photo.
   */
  avatarUrl?: string
  /**
   * Text message to show.
   */
  textMessage: string
  /**
   * Date of message.
   */
  date: string | Date
  /**
   * To show if user is owner of last message.
   */
  isYour?: boolean
  /**
   * To show indicator if opponent is typing a new message.
   */
  isTyping?: boolean
  /**
   * Mark card as selected.
   */
  isSelected?: boolean
  /**
   * Status of displayed message.
   * - sent, but not delivered / read
   * - delivered but not read
   * - read
   * - error: in case of some issues with sending of message
   */
  messageStatus?: 'sent' | 'delivered' | 'read' | 'error'
  /**
   * Number of unread messages.
   */
  numberOfUnread?: number
}

const ConversationCard = forwardRef<HTMLDivElement, ConversationCardProps>(
  function ConversationCard(
    {
      firstName = '',
      lastName = '',
      avatarUrl,
      textMessage,
      date,
      isYour = true,
      isSelected = false,
      isTyping = false,
      messageStatus = 'sent',
      numberOfUnread = 0,
    },
    ref
  ) {
    let formattedDate = format(date, 'HH:mm')

    const todayMinus1Day = sub(new Date(), {
      days: 1,
    })
    const todayMinus7Day = sub(new Date(), {
      days: 7,
    })

    if (isBefore(date, todayMinus7Day)) {
      formattedDate = format(date, 'dd.MM')
    } else if (
      isAfter(date, todayMinus7Day) &&
      isBefore(date, todayMinus1Day)
    ) {
      formattedDate = format(date, 'E')
    }

    const letters = `${firstName.charAt(0)}${lastName.charAt(0)}`

    return (
      <div
        ref={ref}
        className={classNames('w-full px-6 py-3 cursor-pointer space-y-3', {
          'bg-primary-foreground': isSelected,
          'hover:bg-gray-50 dark:hover:bg-gray-900': !isSelected,
        })}
      >
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <Avatar>
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>{letters}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-grow min-w-[1px]">
            <div className="flex items-center space-x-1">
              <div className="font-bold text-1xl flex-grow truncate min-w-[1px]">
                {firstName} {lastName}
              </div>
              {isYour && (
                <div className="flex-shrink-0" data-test={messageStatus}>
                  {messageStatus === 'sent' && (
                    <RiCheckFill size={18} className="text-primary" />
                  )}
                  {messageStatus === 'delivered' && (
                    <RiCheckDoubleFill size={18} className="text-primary" />
                  )}
                  {messageStatus === 'read' && (
                    <RiCheckDoubleFill size={18} className="text-link" />
                  )}
                  {messageStatus === 'error' && (
                    <RiAlertFill size={14} className="text-destructive" />
                  )}
                </div>
              )}

              <time className="flex-shrink-0 text-xs text-muted-foreground">
                {formattedDate}
              </time>
            </div>
            <div className="flex items-center gap-2">
              {isTyping ? (
                <p className="text-muted-foreground italic animate-pulse">
                  ... is typing
                </p>
              ) : (
                <p
                  className={classNames('truncate flex-grow', {
                    'text-muted-foreground': messageStatus !== 'error',
                    'text-muted-foreground/40': messageStatus === 'error',
                    'font-semibold': numberOfUnread > 0,
                  })}
                >
                  {textMessage || <>&nbsp;</>}
                </p>
              )}

              {numberOfUnread > 0 && (
                <div
                  className={classNames(
                    'px-1 h-4 flex items-center justify-center text-background font-bold text-xs rounded-full bg-destructive',
                    {
                      'dark:text-foreground': true,
                    }
                  )}
                >
                  {numberOfUnread}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
)
ConversationCard.displayName = 'ConversationCard'

export default ConversationCard
