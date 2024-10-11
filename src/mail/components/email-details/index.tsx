import { format } from 'date-fns'
import { Email } from '../../types'
import { Avatar, AvatarImage } from '@/components/ui/avatar'

export default function EmailDetails({ email }: { email: Email }) {
  const formattedDate = format(new Date(email.datetime), 'dd MMM HH:mm')
  return (
    <div>
      <div className="border-b-0 border-border py-3 px-4 gap-2">
        <div className="text-lg font-semibold">{email.subject}</div>
        <div className="flex flex-row items-center gap-2">
          <Avatar size={10} className="flex-shrink-0">
            <AvatarImage src={email.avatarUrl} />
          </Avatar>
          <div className="font-semibold flex-grow truncate">{email.name}</div>
          <div className="text-sm text-gray-500 flex-shrink-0">
            {formattedDate}
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="text-sm text-gray-500">{email.text}</div>
      </div>
    </div>
  )
}
