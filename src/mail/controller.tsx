'use client'

import { useMemo, useState } from 'react'

import Layout from './components/layout'

import type { Category, Email } from './types'

export default function Controller({ emails }: { emails: Email[] }) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('inbox')
  const [selectedEmailId, setSelectedEmailId] = useState<Email['id'] | null>(
    null
  )

  const emailsByCategory = useMemo(() => {
    return emails
      .filter((email) => email.category === selectedCategory)
      .sort(
        (a, b) =>
          new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
      )
  }, [emails, selectedCategory])

  const selectedEmail = useMemo(() => {
    return emails.find((email) => email.id === selectedEmailId)
  }, [emails, selectedEmailId])

  return (
    <Layout
      selectedCategory={selectedCategory}
      emails={emailsByCategory}
      selectedEmail={selectedEmail}
      onCategoryClick={(category) => {
        setSelectedCategory(category)
        setSelectedEmailId(null)
      }}
      onEmailClick={(emailId) => setSelectedEmailId(emailId)}
    />
  )
}
