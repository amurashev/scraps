import classNames from 'classnames'

import Image from 'next/image'

import { Person } from '../../types'

function LinkedInIcon({
  size = 28,
  color = '#0a66c2',
}: {
  size?: number
  color?: string
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 50 50"
    >
      <path
        fill={color}
        d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"
      />
    </svg>
  )
}

function EmailIcon({
  size = 28,
  color = '#424242',
}: {
  size?: number
  color?: string
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill={color}
      width={size}
      height={size}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 5v9.5a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5V5H3ZM2 3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.059 10.657 2.477 5.351l1.255-1.557 5.954 4.8a.5.5 0 0 0 .628 0l5.954-4.8 1.255 1.557-6.582 5.306a1.5 1.5 0 0 1-1.882 0Z"
      />
    </svg>
  )
}

const getLinkedInLink = (index: string) =>
  `https://www.linkedin.com/in/${index}/`

function TopSection({ person }: { person: Person }) {
  const linkedInLink = getLinkedInLink(person.linkedIn)

  return (
    <div
      className={classNames(
        'flex flex-col justify-start space-y-4',
        'md:flex-row md:space-x-4 md:space-y-0',
        'print:flex-row print:space-x-4 print:space-y-0'
      )}
    >
      <Image
        src={person.photo}
        width={230}
        height={230}
        alt={person.name}
        className="h-full"
      />
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{person.name}</h1>
        <div className="space-y-0">
          <h2 className="text-1xl font-bold">{person.role}</h2>
          <address className="text-muted-foreground">{person.address}</address>
        </div>

        <p>{person.shortDescription}</p>

        <div className="flex items-center space-x-2 print:hidden">
          <a
            href={linkedInLink}
            target="_blank"
            aria-label="LinkedIn"
            rel="noreferrer"
          >
            <LinkedInIcon />
          </a>
          <a
            href={`mailto:${person.email}`}
            target="_blank"
            aria-label="Email"
            rel="noreferrer"
          >
            <EmailIcon />
          </a>
        </div>
      </div>
    </div>
  )
}

export default TopSection
