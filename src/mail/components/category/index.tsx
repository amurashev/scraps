import {
  IoMailOpenOutline,
  IoReaderOutline,
  IoSend,
  IoTrash,
  IoStar,
} from 'react-icons/io5'

import { cn } from '@/lib/utils'
import { Category } from '../../types'

export const categoryNames: Record<Category, string> = {
  inbox: 'Inbox',
  sent: 'Sent',
  drafts: 'Drafts',
  trash: 'Trash',
  starred: 'Starred',
}

const CategoryIcon: Record<Category, React.ReactNode> = {
  inbox: <IoMailOpenOutline size={20} />,
  sent: <IoSend size={20} />,
  drafts: <IoReaderOutline size={20} />,
  trash: <IoTrash size={20} />,
  starred: <IoStar size={20} />,
}

export default function CategoryItem({
  category,
  selected,
  onClick,
}: {
  category: Category
  selected: boolean
  onClick: () => void
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'p-2 rounded-md cursor-pointer font-semibold text-sm flex items-center gap-2',
        selected && 'bg-cyan-500/20'
      )}
    >
      {CategoryIcon[category]}
      {categoryNames[category]}
    </div>
  )
}
