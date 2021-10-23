import { useContext, useEffect, useState } from 'react'
import { FeedbacksT } from '../../../../context/FeedbackProvider'
import { QuestionContext } from '../../../../context/QuestionProvider'
import { UserT } from '../../../../context/types'
import { UserContext } from '../../../../context/UserProvider'
import styles from './feedbacks.module.css'
import FeedbackUser from '../FeedbackUser'
import UserAnswers from '../UserAnswers'

interface Props {
  title: string
  subtitle: string
  feedbacks: FeedbacksT[]
  feedbackFor: 'me' | 'team'
}

export interface QuestionAnswer {
  questionId: string
  feedbackType: 'scale' | 'multipleChoice' | 'text'
  answer: string
}

const Feedbacks = ({ title, subtitle, feedbacks, feedbackFor }: Props) => {
  const users = useContext(UserContext)
  const questions = useContext(QuestionContext)
  const [selected, setSelected] = useState(-1)
  const [selectedUser, setSelectedUser] = useState('')
  const [questionsAnswers, setQuestionAnswers] = useState<QuestionAnswer[]>([])

  useEffect(() => {
    setQuestionAnswers([])
    setSelectedUser('')
    setSelected(-1)
  }, [feedbackFor])

  if (!users || !questions) return <></>

  const selectUserAndQuestions = (
    idx: number,
    user: UserT,
    feed: FeedbacksT,
  ) => {
    const feedback: any = feed
    delete feedback.userFrom
    delete feedback.userTo
    const questionsAndAnswers: QuestionAnswer[] = []
    for (const key in feedback) {
      const questionAndAnswer: QuestionAnswer = {
        questionId: key,
        feedbackType: feedback[key].feedbackType,
        answer: feedback[key].answer,
      }

      questionsAndAnswers.push(questionAndAnswer)
    }

    setQuestionAnswers(questionsAndAnswers)
    setSelectedUser(user.name)
    setSelected(idx)
  }

  return (
    <>
      <div className={styles.title}>
        <h1>{title}</h1>
      </div>
      <div className={styles.feedbackContainer}>
        <ul className={styles.users}>
          <li>
            <h3>{subtitle}</h3>
          </li>
          {feedbacks.map((feedback, index) => (
            <FeedbackUser
              key={index}
              index={index}
              feedback={feedback}
              selectUser={selectUserAndQuestions}
              selectedUser={selected}
              feedbackFor={feedbackFor}
            />
          ))}
        </ul>

        {selectedUser && (
          <ul className={styles.feedback}>
            <li>
              <h2>{selectedUser}'s Feedback</h2>
            </li>
            {questions?.map((question, index) => (
              <UserAnswers
                key={index}
                question={question}
                questionsAnswers={questionsAnswers}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default Feedbacks
