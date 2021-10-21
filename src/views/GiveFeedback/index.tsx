import * as React from 'react'
import { UserContext } from '../../context/UserProvider'
import MainLayout from '../../layouts/MainLayout'
import User from '../../components/User'
import Button from '../../components/Button'
import styles from './giveFeedback.module.css'
import { useHistory, useLocation } from 'react-router'
import Title from './components/Title'

const GiveFeedback = () => {
  const users = React.useContext(UserContext)
  const history = useHistory()
  const location = useLocation<any>()

  const feedbackCompleted = location?.state?.feedbackCompleted
  return (
    <MainLayout loggedIn>
      <div className={styles.wrapper}>
        <Title feedbackCompleted={feedbackCompleted} />
        {users && users.length > 0 && (
          <ul className={styles.users}>
            {users.map((user) => (
              <li key={user.id} className={styles.user}>
                <User name={user.name} avatarUrl={user.avatarUrl} />
                <span style={{ flex: 1 }} />
                <Button
                  onClick={() => {
                    history.push(`/share-feedback/${user.id}`)
                  }}
                >
                  Fill out
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </MainLayout>
  )
}

export default GiveFeedback
