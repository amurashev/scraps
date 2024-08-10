'use client'

import { useState } from 'react'
import { format } from 'date-fns'

const getDateByString = (date: string) => {
  const [month, year] = date.split('/')
  return new Date(Number(`20${year}`), Number(month) - 1, 1)
}

const formatIndex = 'MMM yyy'

const EmploymentItem = ({
  item,
}: {
  item: {
    company: string
    position: string
    location: string
    responsibilities?: string[]
    skills?: string[]
    shortDescription?: string
    startDate: string
    endDate: string
  }
}) => {
  const [hasFullText, setHasFullText] = useState(false)

  const hasDetails =
    (item.responsibilities && item.responsibilities.length > 0) ||
    (item.skills && item.skills.length > 0)

  const startDateLabel = format(getDateByString(item.startDate), formatIndex)
  const endDateLabel = format(getDateByString(item.endDate), formatIndex)

  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <div>
          <div className="text-lg font-bold">
            {item.position}&nbsp;&ndash;&nbsp;{item.company}
          </div>
          <div className="text-muted-foreground text-sm">
            {startDateLabel}&nbsp;&ndash;&nbsp;{endDateLabel}
          </div>
        </div>
        {item.shortDescription && <div>{item.shortDescription}</div>}
      </div>

      {!hasFullText && hasDetails && (
        <a
          href="#"
          className="text-link print:hidden"
          onClick={(e) => {
            e.preventDefault()
            setHasFullText(true)
          }}
        >
          Show more
        </a>
      )}

      {hasFullText && (
        <>
          {item.responsibilities && item.responsibilities.length > 0 && (
            <div className="space-y-1">
              <div className="font-bold">Job responsibilities</div>
              <ul className="list-disc pl-4">
                {item.responsibilities?.map((item) => (
                  <li key={item}>
                    <div>{item}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {item.skills && item.skills.length > 0 && (
            <div className="space-y-1">
              <div className="font-bold">Skills</div>
              <div>{item.skills?.join(', ')}</div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default EmploymentItem
