import EmptyAnswer from './EmptyAnswer'
import styles from './Feedbacks/feedbacks.module.css'
import { QuestionAnswer } from './Feedbacks/Feedbacks'
import Scale from './Scale'
import Skipped from './Skipped'
import { QuestionT } from '../../../context/QuestionProvider'

interface Props {
  question: QuestionT
  questionsAnswers: QuestionAnswer[]
}
const Text = ({ value }: any) => <>{value}</>
const Container = ({ children, feedbackType }: any) => {
  const FEEDBACKS = ['text', 'multipleChoice']
  return (
    <li
      className={FEEDBACKS.includes(feedbackType) ? styles.column : styles.row}
    >
      {children}
    </li>
  )
}

const Question = ({ question, feedbackType }: any) => {
  return (
    <>
      {feedbackType ? (
        <div>{question.label}</div>
      ) : (
        <Skipped label={question.label || ''} />
      )}
    </>
  )
}

const Answer = ({ feedbackType, answer, Component }: any) => {
  return (
    <div>
      {feedbackType ? (
        <Component value={feedbackType === 'scale' ? Number(answer) : answer} />
      ) : (
        <EmptyAnswer />
      )}
    </div>
  )
}

const UserAnswers = ({ question, questionsAnswers }: Props) => {
  const getAnswerForQuestion = (): QuestionAnswer | undefined => {
    const questionAnswer = questionsAnswers.find(
      (q) => q.questionId === question.id,
    )
    return questionAnswer
  }

  const questionAnswer = getAnswerForQuestion()
  const FeedbackType = {
    scale: Scale,
    text: Text,
    multipleChoice: Text,
  }

  let Component: any = null
  let feedbackType: string
  let answer: string | number

  if (questionAnswer) {
    Component = FeedbackType[questionAnswer.feedbackType]
    feedbackType = questionAnswer.feedbackType
    answer = questionAnswer.answer
  } else {
    Component = Text
    feedbackType = ''
    answer = ''
  }

  if (!Component) return <></>

  return (
    <Container feedbackType={feedbackType}>
      <Question feedbackType={feedbackType} question={question} />
      <Answer
        feedbackType={feedbackType}
        answer={answer}
        Component={Component}
      />
    </Container>
  )
}

export default UserAnswers
