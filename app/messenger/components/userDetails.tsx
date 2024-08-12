import classNames from 'classnames'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const UserDetails = ({
  firstName,
  lastName,
  avatarUrl,
}: {
  firstName: string
  lastName: string
  avatarUrl: string
}) => {
  return (
    <div className="py-10 px-6 w-full">
      <div className="w-full flex flex-col items-center space-y-4">
        <div className="flex-shrink-0">
          <Avatar size={128}>
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>{'AA'}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-grow min-w-[1px] w-full">
          <div className="font-bold text-2xl flex-grow text-center min-w-[1px] leading-7">
            {firstName} {lastName}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetails
