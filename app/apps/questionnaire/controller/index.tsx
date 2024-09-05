'use client'

import { useReducer } from 'react'

import defaultState from './state'
import reducer from './reducer'

import myersbriggs from '../data/myersbriggs.json'
import ProgressBar from '../components/progressBar'
import Result from '../components/result'
import Question from '../components/question'

function Controller() {
  const [state, dispatch] = useReducer(reducer, defaultState)

  const { questionIndex, userAnswers } = state

  const questionnaireData = myersbriggs // TODO: In case of several tests
  const { questions, description, slug } = questionnaireData
  const questionData = questions[questionIndex]
  const { answers } = questionData || {}
  const questionsCount = questions.length
  const isResult = questionIndex >= questions.length

  return (
    <div className="flex flex-col items-center space-y-4">
      <ProgressBar count={questionsCount} index={questionIndex} />

      {isResult ? (
        <Result
          userAnswers={userAnswers}
          questionnaireSlug={slug}
          onReset={() => dispatch({ type: 'resetTest' })}
        />
      ) : (
        <Question
          questionIndex={questionIndex}
          answers={answers}
          description={description}
          onAnswerClick={(value) => {
            dispatch({
              type: 'setUserAnswer',
              index: questionIndex,
              value,
            })
            dispatch({ type: 'increaseQuestionIndex' })
          }}
        />
      )}
    </div>
  )
}

export default Controller
