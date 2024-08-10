import classNames from 'classnames'

import Languages from './components/languages'
import TopSection from './components/topSection'
import EmploymentItem from './components/employmentItem'
import Section from './components/section'
import Education from './components/education'

import person from './data/person.json'

export default function CV() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-6 py-6 md:px-12 md:py-12">
      <div className="space-y-6 max-w-[960px]">
        <TopSection person={person} />

        <hr />

        <div
          className={classNames(
            'w-full flex flex-col space-y-4',
            'md:flex-row md:space-x-4 md:space-y-0',
            'print:flex-row print:space-x-4 print:space-y-0',
          )}
        >
          <div className="md:w-1/2 print:w-1/2">
            <Section label="Summary">
              <ul className="list-disc pl-4">
                {person.summary.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Section>
          </div>

          <div className="md:w-1/2 print:w-1/2">
            <Section label="Personal qualities">
              <ul className="list-disc pl-4">
                {person.personalQualities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Section>
          </div>
        </div>

        <hr />

        <div className="w-full flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="md:w-2/3">
            <Section label="Employment">
              <ul className="space-y-4">
                {person.employment.map((item) => (
                  <EmploymentItem key={item.company} item={item} />
                ))}
              </ul>
            </Section>
          </div>
          <div className="md:w-1/3 space-y-4">
            <Section label="Languages">
              <Languages languages={person.languages} />
            </Section>
            <Section label="Education">
              <Education education={person.education} />
            </Section>
          </div>
        </div>
      </div>
    </main>
  )
}
