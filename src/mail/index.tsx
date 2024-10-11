import Controller from './controller'

import type { Category } from './types'

const emails = [
  {
    id: 1,
    name: 'John Doe',
    text: 'Hello, this is a test email. I hope this message finds you well. I wanted to reach out to discuss our upcoming project and ensure we are aligned on the objectives and timelines.',
    datetime: '2023-10-01T00:00:00Z', // updated from date to datetime
    subject: 'Test Email 1',
    avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg', // updated to real data
    category: 'inbox' as Category,
  },
  {
    id: 2,
    name: 'Jane Smith',
    text: 'Just checking in! I wanted to see how everything is going on your end. If you have any updates or need assistance, feel free to let me know.',
    datetime: '2023-10-02T00:00:00Z', // updated from date to datetime
    subject: 'Check-in',
    avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg', // updated to real data
    category: 'inbox' as Category,
  },
  {
    id: 3,
    name: 'Alice Johnson',
    text: "Don't forget our meeting tomorrow. We will be discussing the new strategies for the quarter and I would love to hear your thoughts on the proposed ideas.",
    datetime: '2023-10-03T00:00:00Z', // updated from date to datetime
    subject: 'Meeting Reminder',
    avatarUrl: 'https://randomuser.me/api/portraits/women/3.jpg', // updated to real data
    category: 'inbox' as Category,
  },
  // ... existing emails ...
  {
    id: 4,
    name: 'Bob Brown',
    text: "Your order has been shipped. You can expect it to arrive within the next few days. If you have any questions about your order, please don't hesitate to reach out.",
    datetime: '2023-10-04T00:00:00Z', // updated from date to datetime
    subject: 'Order Update',
    avatarUrl: 'https://randomuser.me/api/portraits/men/4.jpg', // updated to real data
    category: 'sent' as Category,
  },
  {
    id: 5,
    name: 'Charlie Green',
    text: 'Meeting notes attached. Please review them at your convenience and let me know if you have any questions or additional points to discuss.',
    datetime: '2023-10-05T00:00:00Z', // updated from date to datetime
    subject: 'Notes',
    avatarUrl: 'https://randomuser.me/api/portraits/men/5.jpg', // updated to real data
    category: 'sent' as Category,
  },
  {
    id: 6,
    name: 'Diana Prince',
    text: 'Happy Birthday! I hope you have a fantastic day filled with joy and laughter. Remember to take some time for yourself and celebrate your achievements.',
    datetime: '2023-10-06T00:00:00Z', // updated from date to datetime
    subject: 'Birthday Wishes',
    avatarUrl: 'https://randomuser.me/api/portraits/women/6.jpg', // updated to real data
    category: 'trash' as Category,
  },
  {
    id: 7,
    name: 'Ethan Hunt',
    text: 'Your subscription is expiring soon. We value your membership and would love to offer you a special renewal discount. Please check your account for details.',
    datetime: '2023-10-07T00:00:00Z', // updated from date to datetime
    subject: 'Subscription Reminder',
    avatarUrl: 'https://randomuser.me/api/portraits/men/7.jpg', // updated to real data
    category: 'trash' as Category,
  },
  {
    id: 8,
    name: 'Fiona Apple',
    text: "Don't miss our upcoming event! We have an exciting lineup planned and it would be great to see you there. Make sure to RSVP as soon as possible.",
    datetime: '2023-10-08T00:00:00Z', // updated from date to datetime
    subject: 'Event Invitation',
    avatarUrl: 'https://randomuser.me/api/portraits/women/8.jpg', // updated to real data
    category: 'starred' as Category,
  },
  {
    id: 9,
    name: 'George Clooney',
    text: 'Check out our new features. We have made several updates that enhance user experience and functionality. Your feedback is important to us, so please share your thoughts.',
    datetime: '2023-10-09T00:00:00Z', // updated from date to datetime
    subject: 'New Features',
    avatarUrl: 'https://randomuser.me/api/portraits/men/9.jpg', // updated to real data
    category: 'starred' as Category,
  },
  {
    id: 10,
    name: 'Hannah Montana',
    text: 'Your feedback is important to us. We are constantly striving to improve our services and your insights would be invaluable in this process.',
    datetime: '2023-10-10T00:00:00Z', // updated from date to datetime
    subject: 'Feedback Request',
    avatarUrl: 'https://randomuser.me/api/portraits/women/10.jpg', // updated to real data
    category: 'drafts' as Category,
  },
  {
    id: 11,
    name: 'Ian Malcolm',
    text: 'Important security update. We have implemented new measures to ensure your data is protected. Please review the changes and let us know if you have any concerns.',
    datetime: '2023-10-11T00:00:00Z', // updated from date to datetime
    subject: 'Security Alert',
    avatarUrl: 'https://randomuser.me/api/portraits/men/11.jpg', // updated to real data
    category: 'drafts' as Category,
  },
  {
    id: 12,
    name: 'Jack Sparrow',
    text: 'Your account has been created. Welcome aboard! We are excited to have you with us and look forward to providing you with the best service possible.',
    datetime: '2023-10-12T00:00:00Z', // updated from date to datetime
    subject: 'Account Created',
    avatarUrl: 'https://randomuser.me/api/portraits/men/12.jpg', // updated to real data
    category: 'drafts' as Category,
  },
]

export default function MailPage() {
  return <Controller emails={emails} />
}
