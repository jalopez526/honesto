import { useState } from 'react'
import { useHistory } from 'react-router'
import Space from '../../../components/Space'
import User from '../../../components/User'
import { QuestionT } from '../../../context/QuestionProvider'
import { UserT } from '../../../context/types'
import styles from '../feedBackQuestions.module.css'
import Actions from '../../../components/Actions'
import FeedbackType from './FeedbackType'
import ProgressBar from '../../../components/ProgressBar/ProgressBar'
import QuestionsCompleted from './QuestionsCompleted'

interface Props {
  question: QuestionT
  feedbackUser: Partial<UserT>
  totalSteps?: number
  currentStep?: number
  nextStep?: Function
  previousStep?: Function
  goToStep?: Function
}

const Question = ({
  question,
  feedbackUser,
  totalSteps = 0,
  currentStep = 0,
  nextStep = () => {},
  previousStep = () => {},
}: Props) => {
  const [isDisabled, setIsDisable] = useState(true)
  const history = useHistory()

  const goForward = () => {
    if (currentStep === totalSteps) {
      history.push({
        pathname: '/share-feedback',
        state: {
          feedbackCompleted: true,
        },
      })
      return
    }

    nextStep()
  }

  return (
    <section key={question.id} className={styles.wizard}>
      <div className={styles.header}>
        <div>
          <h1>{question.label}</h1>
          <p className={styles.subtitle}>
            Share your feedback for {feedbackUser.name}
          </p>
        </div>
        <div className={styles.avatar}>
          <User avatarUrl={feedbackUser?.avatarUrl} />
        </div>
      </div>
      <div className={styles.questions}>
        <div className={styles.container}>
          <Space marginTop="1.5em">
            <FeedbackType
              feedbackUser={feedbackUser}
              setIsDisable={setIsDisable}
              question={question}
            />
          </Space>
          <Space marginTop="2em">
            <Actions
              isDisabled={isDisabled}
              isRequired={question.required}
              onBack={() => previousStep()}
              onForward={goForward}
              onSkip={goForward}
            />
          </Space>
          <Space marginTop="2em">
            <ProgressBar completed={(currentStep / totalSteps) * 100} />
          </Space>
          <QuestionsCompleted total={totalSteps} current={currentStep} />
        </div>
      </div>
    </section>
  )
}

export default Question
