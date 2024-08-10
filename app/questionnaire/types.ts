export type State = {
  questionIndex: number
  userAnswers: Record<number, string>
}

export type Action =
  | { type: 'increaseQuestionIndex' }
  | { type: 'setUserAnswer'; index: number; value: string }
  | { type: 'resetTest' }
