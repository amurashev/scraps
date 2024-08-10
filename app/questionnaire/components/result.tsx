import { Button } from '@/components/ui/button'

import interpretationsData from '../utils/index'

function Result({
  userAnswers = [],
  questionnaireSlug,
  onReset,
}: {
  userAnswers: Record<number, string>
  questionnaireSlug: string
  onReset: () => void
}) {
  const resultString = Object.values(userAnswers).join('')
  const interpretationData =
    interpretationsData[questionnaireSlug as keyof typeof interpretationsData]

  const result = interpretationData
    ? interpretationData(resultString)
    : undefined

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-3xl font-bold space-y-4">Result</h1>

      {result && (
        <div className="w-full flex flex-col justify-center space-y-2">
          <div className="text-xl font-bold text-center">
            {result.title} ({result.index})
          </div>

          <div className="text-center text-muted-foreground">
            {result.description}
          </div>
        </div>
      )}

      <Button onClick={onReset}>Take the test again</Button>
    </div>
  )
}

export default Result
