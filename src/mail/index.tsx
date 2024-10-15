import Controller from './controller'
import emails from './data/emails'

export default function MailPage() {
  return <Controller emails={emails} />
}
