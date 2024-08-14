const pages = [
  {
    title: 'CV',
    description: "Minimalist page that shows CV of it's developer",
    href: '/cv',
  },
  {
    title: 'Messenger',
    description:
      'Example of simple messenger. Just layout with some basic actions (w/o data saving/fetching)',
    href: '/messenger',
  },
  {
    title: 'Settings',
    description: '',
    href: '/settings/profile',
    subPages: ['/settings/profile', '/settings/notifications'],
  },
  {
    title: 'l18n',
    description: 'Example of using Internationalization for content',
    href: '/l18n',
  },
  // {
  //   title: 'AI',
  //   description: '',
  //   href: '/ai',
  // },
  {
    title: 'Questionnaire',
    description:
      'An example of page with questionnaire. Myers-Briggs Type Indicator is used as example',
    href: '/questionnaire',
  },
  {
    title: 'Life bars',
    description: 'Simple page to present the life cycle as a graph.',
    href: '/life',
  },
  {
    title: 'Login page',
    description: 'Example of minimalistic login page',
    href: '/login',
  },
]

export default pages
