import { useState } from 'react'
import StepWizard from 'react-step-wizard'
import { QuestionT } from '../../../context/QuestionProvider'
import { UserT } from '../../../context/types'
import Question from './Question'

interface Props {
  questions: QuestionT[] | null
  feedbackUser: Partial<UserT> | undefined
}

const Wizard = ({ questions, feedbackUser }: Props) => {
  const [wizard, setWizard] = useState<any>({})

  // make typescript happy
  if (!questions || !feedbackUser || !wizard) return <></>
  return (
    <StepWizard instance={setWizard}>
      {questions.map((question) => {
        return (
          <Question
            key={question.id}
            question={question}
            feedbackUser={feedbackUser}
          />
        )
      })}
    </StepWizard>
  )
}

export default Wizard
