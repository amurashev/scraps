'use client'

import JobView, { JobCardProps } from '@/components/parts/jobs/job-view'
import { Card } from '@/components/ui/card'

import { getRandomCompany, getRandomPosition } from '@/lib/fake-data'

import Content from '../components/content'
import Code from './code.mdx'
import { components } from '../data'

const company0 = getRandomCompany(0)
const position = getRandomPosition(0)

const defaultProps: JobCardProps = {
  position: position.title,
  companyName: company0.name,
  companyAvatarUrl: company0.logo,
  location: company0.location,
  description: position.description,
  skills: position.skills,
  positionLevel: position.level,
  salary: position.salary,
  salaryType: position.salaryType,
  date: '2024-08-12T16:15:53+02:00',
  locationType: position.locationType || 'remote',
  positionTerm: position.term || 'full',
}

function ItemWrapper({ children }: { children: React.ReactNode }) {
  return <Card className="w-full">{children}</Card>
}

function EnhancedJobView(props: JobCardProps) {
  return (
    <ItemWrapper>
      <JobView {...props} />
    </ItemWrapper>
  )
}

export default function Page() {
  const componentIndex = 'job-view'
  const component = components[componentIndex]
  return (
    <Content
      name={component.name}
      description={component.description}
      code={<Code />}
      component={<EnhancedJobView {...defaultProps} />}
      cases={[]}
    />
  )
}
