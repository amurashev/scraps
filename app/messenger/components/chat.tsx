import classNames from 'classnames'

import { format } from 'date-fns'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const Chat = ({
  firstName,
  lastName,
  avatarUrl,
}: {
  firstName: string
  lastName: string
  avatarUrl: string
}) => {
  return (
    <div
      className={classNames(
        'w-full px-6 py-3 border-0 border-b-[1px] border-border'
      )}
    >
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <Avatar>
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>{'AA'}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-grow min-w-[1px] pt-0">
          <div className="font-bold text-1xl flex-grow truncate min-w-[1px] leading-5">
            {firstName} {lastName}
          </div>

          <div className="text-muted-foreground text-sm">Online</div>
        </div>
      </div>
    </div>
  )
}

export default Chat
