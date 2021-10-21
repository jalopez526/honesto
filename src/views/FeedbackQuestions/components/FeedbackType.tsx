import { useContext } from 'react'
import { AccountContext } from '../../../context/AccountProvider'
import {
  DispatchFeedbackContext,
  FeedbacksContext,
} from '../../../context/FeedbackProvider'
import { QuestionT } from '../../../context/QuestionProvider'
import { UserT } from '../../../context/types'
import MultipleChoice from './MultipleChoice'
import Scale from './Scale'
import Textarea from './Textarea'

interface Props {
  question: QuestionT
  feedbackUser: Partial<UserT>
  setIsDisable: (bool: boolean) => void
}

enum Feedback {
  SCALE = 'scale',
  TEXT = 'text',
  MULTIPLE_CHOICE = 'multipleChoice',
}

const FeedbackType = ({ question, setIsDisable, feedbackUser }: Props) => {
  const feedbackDispatch = useContext(DispatchFeedbackContext)
  const feedbacksContext = useContext(FeedbacksContext)
  const currentUser = useContext(AccountContext)

  if (!feedbackUser || !feedbacksContext || !currentUser) return <></>

  const { type, options, label } = question

  /**
   * Basically this function focuses on storing the answers per user in a single Array position.
   * @param {string | number} p - The payload (answer) of the question
   * @param {Function} cb - callback in case of needing to inject some extra funcionality
   */
  const storeFeedback = (p: string | number, cb?: Function) => {
    if (cb) cb()

    // Getting the user.id of the feedback user
    const payload = [...feedbacksContext]
    let currentFeedback = payload.findIndex(
      (fe) => fe.userTo === feedbackUser.id,
    )

    // We get all the previous answer of the feedback user if exists.
    // Update the existing one in case we have decided to change the answer of a previous question
    // We also store the type of the feedback we provide (scale, multipleChoise and text) and the userFrom (user logged, the one giving the feedback) and userTo (the user receiving feedback)
    const feedback = {
      ...payload[currentFeedback],
      userFrom: currentUser?.id,
      userTo: feedbackUser.id || '',
      [question.id]: {
        answer: p,
        feedbackType: type,
      },
    }

    // We override the index of an existing feedback in case it exists. If not just push a new one.
    if (currentFeedback >= 0) {
      payload[currentFeedback] = {
        ...feedback,
      }
    } else {
      payload.push(feedback)
    }

    // Store our data
    feedbackDispatch({
      action: 'add',
      payload,
    })
  }

  return (
    <>
      {type === Feedback.MULTIPLE_CHOICE && options && (
        <MultipleChoice
          options={options}
          store={storeFeedback}
          setIsDisable={setIsDisable}
        />
      )}
      {type === Feedback.SCALE && label && (
        <Scale
          store={storeFeedback}
          setIsDisable={setIsDisable}
          label={label}
        />
      )}
      {type === Feedback.TEXT && (
        <Textarea store={storeFeedback} setIsDisable={setIsDisable} />
      )}
    </>
  )
}

export default FeedbackType
