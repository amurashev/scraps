export type Email = {
  id: number
  name: string
  text: string
  datetime: string
  subject: string
  avatarUrl: string
  category: Category
}

export type Category = 'inbox' | 'sent' | 'drafts' | 'trash' | 'starred'
