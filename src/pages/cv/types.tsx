export type Person = {
  name: string
  role: string
  email: string
  address: string
  linkedIn: string
  photo: string
  languages: {
    label: string
    level: number
  }[]
  summary: string[]
  personalQualities: string[]
  shortDescription: string
  education: {
    year: number
    school: string
    country: string
    field: string
    degree: string
  }[]
  employment: {
    company: string
    position: string
    location: string
    locationType: string // 'remote' | 'on-site'
    shortDescription?: string
    responsibilities?: string[]
    skills?: string[]
    startDate: string
    endDate: string
  }[]
}
