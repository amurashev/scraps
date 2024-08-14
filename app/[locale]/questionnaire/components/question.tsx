function Question({
  questionIndex,
  description,
  answers,
  onAnswerClick,
}: {
  questionIndex: number
  description: string
  answers: { title: string; id?: string }[]
  onAnswerClick: (value: string) => void
}) {
  return (
    <>
      <h1 className="text-3xl font-bold mt-2">Question #{questionIndex + 1}</h1>

      <div className="flex flex-col gap-4 w-full">
        {answers.map((answer, key) => (
          <button
            key={answer.id || key}
            type="submit"
            className="bg-gray-100 w-full p-4 rounded-md text-gray-900"
            onClick={() => onAnswerClick(answer.id || String(key))}
          >
            <span>
              {key === 0 ? 'A' : 'B'}: {answer.title}
            </span>
          </button>
        ))}
      </div>

      <p className="text text-center text-muted-foreground">{description}</p>
    </>
  )
}

export default Question
