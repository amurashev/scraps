import messages from './messages'

const isLocalePossible = (value: string) => ['EN', 'ES', 'RU'].includes(value)

const isLevelPossible = (value: number) =>
  Number(value) > 0 && Number(value) <= 5

function Languages({
  languages,
}: {
  languages: {
    label: string
    level: number
  }[]
}) {
  return (
    <ul>
      {languages.map((item) => {
        const { label, level } = item
        const languageLabel = isLocalePossible(label)
          ? messages[label.toLocaleLowerCase() as keyof typeof messages]
          : messages.en
        const levelLabel = isLevelPossible(level)
          ? messages[`level${level}` as keyof typeof messages]
          : messages.level5

        return (
          <li key={item.label}>
            <span>{languageLabel.defaultMessage}&nbsp;&ndash;&nbsp;</span>
            <span className="text-muted-foreground">
              {levelLabel.defaultMessage}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

export default Languages
