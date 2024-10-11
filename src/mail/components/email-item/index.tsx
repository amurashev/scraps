import { format } from 'date-fns'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Email } from '../../types'
import { cn } from '@/lib/utils'

export default function EmailItem({
  email,
  selected,
  onClick,
}: {
  email: Email
  selected: boolean
  onClick: () => void
}) {
  const formattedDate = format(new Date(email.datetime), 'dd MMM HH:mm')
  return (
    <div
      onClick={onClick}
      className={cn(
        'border border-border p-2 rounded-md cursor-pointer flex flex-col gap-2',
        selected && 'bg-gray-300/20'
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Avatar size={6} className='flex-shrink-0'>
          <AvatarImage src={email.avatarUrl} />
        </Avatar>
        <div className="font-semibold flex-grow truncate">{email.name}</div>
        <div className="text-sm text-gray-500 flex-shrink-0">
          {formattedDate}
        </div>
      </div>
      <div className="flex flex-col gap-0">
        <div className="font-semibold text-sm">{email.subject}</div>
        <div className="text-sm text-gray-500 line-clamp-2">{email.text}</div>
      </div>
    </div>
  )
}
