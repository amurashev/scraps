import EmailItem from '../email-item'
import type { Category, Email } from '../../types'
import { categoryNames } from '../category'

export default function EmailsList({
  emails,
  selectedCategory,
  selectedEmailId,
  onEmailClick,
}: {
  emails: Email[]
  selectedCategory: Category
  selectedEmailId: Email['id'] | null
  onEmailClick: (emailId: Email['id']) => void
}) {
  return (
    <div className="flex flex-col gap-0">
      <div className="flex flex-row items-center gap-2 border-b border-border py-3 px-4">
        <h1 className="font-bold text-lg">{categoryNames[selectedCategory]}</h1>
      </div>
      <div className="flex flex-col gap-3 p-3">
        {emails.map((email) => (
          <EmailItem
            key={email.id}
            email={email}
            selected={selectedEmailId === email.id}
            onClick={() => onEmailClick(email.id)}
          />
        ))}
      </div>
    </div>
  )
}
