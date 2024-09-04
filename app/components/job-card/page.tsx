'use client'

import JobCard, {
  JobCardSkeleton,
  JobCardProps,
} from '@/components/parts/jobs/job-card'
import { Card } from '@/components/ui/card'

import { getRandomCompany } from '@/lib/fake-data'

import Content from '../components/content'
import Code from './code.mdx'

const data = {
  index: 'job-card',
  name: 'Job Card',
  description:
    'Display a job information with some details like: location, salary, position level',
  mdx: <Code />,
}

const company0 = getRandomCompany(0)
const company1 = getRandomCompany(1)
const company2 = getRandomCompany(2)
const company3 = getRandomCompany(3)
const company4 = getRandomCompany(4)
const company5 = getRandomCompany(5)

const defaultProps: JobCardProps = {
  position: 'Senior Frontend Developer',
  companyName: company0.name,
  companyAvatarUrl: company0.logo,
  location: company0.location,
  description: '',
  date: new Date(),
  locationType: 'remote',
  positionTerm: 'full',
  positionLevel: 'entry',
  skills: ['React', 'TypeScript', 'CSS', 'HTML'],
}

const today = new Date()

const todaySub1Hour = new Date()
todaySub1Hour.setHours(todaySub1Hour.getHours() - 1)

const todaySub1Day = new Date()
todaySub1Day.setDate(todaySub1Day.getDate() - 1)

const todaySub1Week = new Date()
todaySub1Week.setDate(todaySub1Week.getDate() - 7)

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 flex-wrap">
      {children}
    </div>
  )
}

function ItemWrapper({ children }: { children: React.ReactNode }) {
  return <Card className="w-full">{children}</Card>
}

function EnhancedJobCard(props: JobCardProps) {
  return (
    <ItemWrapper>
      <JobCard {...props} />
    </ItemWrapper>
  )
}

export default function Page() {
  return (
    <Content
      name={data.name}
      description={data.description}
      code={data.mdx}
      component={
        <EnhancedJobCard
          position="Business Analyst"
          companyName="Leaves & Plants"
          companyAvatarUrl="/images/logos/leaves.png"
          location="London, UK"
          date={new Date()}
          salaryType="hourly"
          locationType="remote"
          positionLevel="middle"
          positionTerm="full"
          salary={30}
          description="Our company is a group of schools, which aims to provide excellent education to children and young people across the country. We seek to improve the life chances of all the children and young people we serve and make it our mission to bring out 'the best in everyone' – students, staff, parents, and the wider community."
          skills={['Business Process', 'Analytical Skills']}
        />
      }
      cases={[
        {
          title: 'Different user cases',
          jsx: (
            <Wrapper>
              <EnhancedJobCard
                {...defaultProps}
                description="Our company is a group of schools, which aims to provide excellent education to children and young people across the country. We seek to improve the life chances of all the children and young people we serve and make it our mission to bring out 'the best in everyone' – students, staff, parents, and the wider community."
              />
              <EnhancedJobCard
                {...defaultProps}
                companyName={company1.name}
                companyAvatarUrl={company1.logo}
                location={company1.location}
                description="Leading Company in the payments industry on the lookout for a Data Analytics Lead:"
                position="Data Team Lead"
                positionLevel="senior"
                skills={['SQL', 'AWS', 'Databases']}
              />
              <EnhancedJobCard
                {...defaultProps}
                companyName={company2.name}
                companyAvatarUrl={company2.logo}
                location={company2.location}
                position="Email Marketing Specialist / Social Media Manager"
                description="Our client is looking for an experienced ML/AI engineer to lead their delivery of effective ML/AI- driven solutions and processes, and to help shape their ML/AI strategy."
                skills={[
                  'Copywriting',
                  'Email',
                  'Social Media',
                  'Web Content Writing',
                ]}
                positionLevel="middle"
              />
              <EnhancedJobCard
                {...defaultProps}
                companyName={company3.name}
                companyAvatarUrl={company3.logo}
                location={company3.location}
                position="Head of Artificial Intelligence"
                description="We are proud to be working with an exciting AI company, looking for their next Head of Artificial Intelligence, who will build and lead a talented team in developing visionary AI-driven products for consumers and businesses."
                skills={[
                  'Artificial Intelligence',
                  'Deep Learning',
                  'Machine Learning',
                ]}
                positionLevel="senior"
              />
              <EnhancedJobCard
                {...defaultProps}
                companyName={company4.name}
                companyAvatarUrl={company4.logo}
                location={company4.location}
                description="We are a talent and innovation led company with 738,000 people serving clients in more than 120 countries. Technology is at the core of change today, and we are one of the world’s leaders in helping drive that change, with strong ecosystem relationships."
                position="Sales Manager"
                skills={['Sales', 'Client Accounts']}
              />
              <EnhancedJobCard
                {...defaultProps}
                companyName={company5.name}
                companyAvatarUrl={company5.logo}
                location={company5.location}
                salaryType="hourly"
                salary={30}
                position="Marketing Manager"
                description="Business Analyst with SIGMA tool experience or similar reporting /dashboard tool experience is MUST"
                skills={['Business Process', 'Analytical Skills']}
              />
            </Wrapper>
          ),
        },
        {
          title: 'Different sizes',
          jsx: (
            <div className="flex flex-col gap-2">
              <Card className="md:w-1/2">
                <JobCard
                  {...defaultProps}
                  description="Our company is a group of schools, which aims to provide excellent education to children and young people across the country. We seek to improve the life chances of all the children and young people we serve and make it our mission to bring out 'the best in everyone' – students, staff, parents, and the wider community."
                />
              </Card>
              <Card className="md:w-3/4">
                <JobCard
                  {...defaultProps}
                  description="Our company is a group of schools, which aims to provide excellent education to children and young people across the country. We seek to improve the life chances of all the children and young people we serve and make it our mission to bring out 'the best in everyone' – students, staff, parents, and the wider community."
                />
              </Card>
              <Card className="w-full">
                <JobCard
                  {...defaultProps}
                  description="Our company is a group of schools, which aims to provide excellent education to children and young people across the country. We seek to improve the life chances of all the children and young people we serve and make it our mission to bring out 'the best in everyone' – students, staff, parents, and the wider community."
                />
              </Card>
            </div>
          ),
        },
        {
          title: 'Different Salary types',
          jsx: (
            <Wrapper>
              <EnhancedJobCard
                {...defaultProps}
                salary={100}
                salaryType="hourly"
              />

              <EnhancedJobCard
                {...defaultProps}
                salary={6000}
                salaryType="monthly"
              />

              <EnhancedJobCard
                {...defaultProps}
                salary={120000}
                salaryType="yearly"
              />
            </Wrapper>
          ),
        },
        {
          title: 'Different Posting time',
          jsx: (
            <Wrapper>
              <EnhancedJobCard {...defaultProps} date={today} />
              <EnhancedJobCard {...defaultProps} date={todaySub1Hour} />
              <EnhancedJobCard {...defaultProps} date={todaySub1Day} />
              <EnhancedJobCard {...defaultProps} date={todaySub1Week} />
            </Wrapper>
          ),
        },
        {
          title: 'Liked / untouched',
          jsx: (
            <Wrapper>
              <EnhancedJobCard {...defaultProps} isLiked />
              <EnhancedJobCard {...defaultProps} isLiked={false} />
            </Wrapper>
          ),
        },
        {
          title: 'Skeleton',
          jsx: (
            <Wrapper>
              <ItemWrapper>
                <JobCardSkeleton />
              </ItemWrapper>

              <ItemWrapper>
                <JobCard
                  {...defaultProps}
                  description="Our company is a group of schools, which aims to provide excellent education to children and young people across the country. We seek to improve the life chances of all the children and young people we serve and make it our mission to bring out 'the best in everyone' – students, staff, parents, and the wider community."
                />
              </ItemWrapper>
            </Wrapper>
          ),
        },
      ]}
    />
  )
}
