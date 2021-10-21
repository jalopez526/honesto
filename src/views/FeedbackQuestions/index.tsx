import { useContext, useEffect, useState } from 'react'
import { QuestionContext } from '../../context/QuestionProvider'
import MainLayout from '../../layouts/MainLayout'
import styles from './feedBackQuestions.module.css'
import { useParams, useHistory } from 'react-router'
import BackButton from '../../components/Button/BackButton'
import Wizard from './components/Wizard'
import { UserContext } from '../../context/UserProvider'
import { UserT } from '../../context/types'

interface Params {
  id: string
}

const FeedbackQuestions = () => {
  const questions = useContext(QuestionContext)
  const users = useContext(UserContext)
  const { id } = useParams<Params>()
  const [feedbackUser, setFeedbackUser] = useState<Partial<UserT> | undefined>(
    {},
  )
  const history = useHistory()

  useEffect(() => {
    setFeedbackUser(users?.find((user) => user.id === id))
  }, [id, users])

  return (
    <MainLayout loggedIn>
      <div className={styles.wrapper}>
        <BackButton onClick={() => history.push('/share-feedback')} />
        <Wizard questions={questions} feedbackUser={feedbackUser} />
      </div>
    </MainLayout>
  )
}

export default FeedbackQuestions
