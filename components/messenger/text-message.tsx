import classNames from 'classnames'
import { format } from 'date-fns'
import { forwardRef } from 'react'
import { RiCheckFill, RiAlertFill, RiCheckDoubleFill } from 'react-icons/ri'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface TextMessageProps {
  /**
   * Id of message
   */
  id: string
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
  avatarUrl: string
  /**
   * Text message to show.
   */
  text: string
  /**
   * Date of message.
   */
  date: string | Date
  /**
   * Status of displayed message.
   * - sent, but not delivered / read
   * - delivered but not read
   * - read
   * - error: in case of some issues with sending of message
   */
  messageStatus?: 'sent' | 'delivered' | 'read' | 'error'
  /**
   * To show if user is owner of last message.
   */
  isYour: boolean
  /**
   * To show if the message is follows after message from same user
   */
  isNext: boolean
}

const TextMessage = forwardRef<HTMLDivElement, TextMessageProps>(
  function TextMessage(
    {
      id,
      firstName,
      lastName,
      avatarUrl,
      text,
      date,
      messageStatus = 'sent',
      isYour = false,
      isNext = false,
    },
    ref
  ) {
    const formattedDate = format(date, 'HH:mm')
    const isTemp = id.includes('temp')

    return (
      <div
        ref={ref}
        className={classNames('flex items-start gap-2', {
          'flex-row-reverse': isYour,
        })}
      >
        {!isNext && (
          <div className="flex-shrink-0">
            <Avatar size={8}>
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>AA</AvatarFallback>
            </Avatar>
          </div>
        )}
        <div
          className={classNames('space-y-1 flex flex-col min-w-[1px]', {
            'items-start': !isYour,
            'items-end': isYour,
            'pr-[40px]': isNext && isYour,
            'pl-[40px]': isNext && !isYour,
            'opacity-60': isTemp,
          })}
        >
          {!isNext && (
            <div
              className={classNames(
                'flex items-center gap-2 w-full min-w-[1px]',
                {
                  'justify-end text-right': isYour,
                  'justify-start text-left': !isYour,
                }
              )}
            >
              <div className="font-bold text-sm truncate">
                {firstName} {lastName}
              </div>
            </div>
          )}
          <div
            className={classNames(
              'text-muted-foreground rounded-sm px-3 py-2',
              {
                'bg-muted': messageStatus !== 'error',
                'bg-destructive/10 dark:bg-destructive/40':
                  messageStatus === 'error',
              }
            )}
          >
            <p className="break-words">
              {text}{' '}
              <div className="flex-shrink-0 ml-2 mt-[8px] float-end text-muted-foreground text-right flex items-center gap-[1px]">
                <time className="text-[10px]">{formattedDate}</time>
                {isYour && (
                  <div className="flex-shrink-0" data-test={messageStatus}>
                    {messageStatus === 'sent' && (
                      <RiCheckFill size={16} className="text-primary" />
                    )}
                    {messageStatus === 'delivered' && (
                      <RiCheckDoubleFill size={16} className="text-primary" />
                    )}
                    {messageStatus === 'read' && (
                      <RiCheckDoubleFill size={16} className="text-link" />
                    )}
                    {messageStatus === 'error' && (
                      <RiAlertFill size={16} className="text-destructive" />
                    )}
                  </div>
                )}
              </div>
            </p>
          </div>
        </div>
      </div>
    )
  }
)

export default TextMessage
