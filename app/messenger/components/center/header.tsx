import classNames from 'classnames'

import { FaChevronLeft, FaIdCardClip } from 'react-icons/fa6'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { IconButton } from '@/components/ui/icon-button'

const Header = ({
  firstName,
  lastName,
  avatarUrl,
  onShowDetails,
  onBack,
}: {
  firstName: string
  lastName: string
  avatarUrl: string
  onShowDetails: () => void
  onBack: () => void
}) => {
  return (
    <div className={classNames('w-full px-4 flex items-center space-x-3')}>
      <div className="flex flex-shrink-0 space-x-1">
        <IconButton onClick={onBack}>
          <FaChevronLeft size={18} />
        </IconButton>
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
      <div>
        <IconButton onClick={onShowDetails}>
          <FaIdCardClip size={18} />
        </IconButton>
      </div>
    </div>
  )
}

export default Header
