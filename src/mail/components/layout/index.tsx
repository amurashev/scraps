import type { Category, Email } from '../../types'

import CategoryItem from '../category'
import EmailDetails from '../email-details'
import EmailsList from '../emails-list'
import NoEmail from '../no-email'

const categories: Category[] = ['inbox', 'sent', 'drafts', 'trash', 'starred']

export default function Layout({
  selectedCategory,
  emails,
  selectedEmail,
  onCategoryClick,
  onEmailClick,
}: {
  selectedCategory: Category
  emails: Email[]
  selectedEmail: Email | undefined
  onCategoryClick: (category: Category) => void
  onEmailClick: (emailId: Email['id']) => void
}) {
  return (
    <main className="flex flex-col w-full h-[100vh] bg-[#e7e6f0] p-10">
      <div className="bg-[#f6f6f6] rounded-lg p-4 h-full flex gap-4 shadow-md">
        <div className="w-[200px] flex-shrink-0 flex flex-col gap-1">
          {categories.map((category) => (
            <CategoryItem
              key={category}
              category={category}
              selected={selectedCategory === category}
              onClick={() => onCategoryClick(category)}
            />
          ))}
        </div>
        <div className="flex-grow bg-white border-0 border-border shadow-md rounded-lg flex flex-row divide-x divide-border">
          <div className="w-[300px] flex-shrink-0">
            <EmailsList
              selectedCategory={selectedCategory}
              selectedEmailId={selectedEmail?.id ?? null}
              emails={emails}
              onEmailClick={onEmailClick}
            />
          </div>
          <div className="h-full flex-grow">
            {selectedEmail && <EmailDetails email={selectedEmail} />}
            {!selectedEmail && <NoEmail />}
          </div>
        </div>
      </div>
    </main>
  )
}
