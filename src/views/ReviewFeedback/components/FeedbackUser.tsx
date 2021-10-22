import classNames from 'classnames'
import { useContext, useState } from 'react'
import User from '../../../components/User'
import { FeedbacksT } from '../../../context/FeedbackProvider'
import { UserT } from '../../../context/types'
import { UserContext } from '../../../context/UserProvider'
import styles from './Feedbacks/feedbacks.module.css'

interface Props {
  index: number
  selectedUser: number
  feedback: FeedbacksT
  feedbackFor: 'me' | 'team'
  selectUser: (idx: number, user: UserT, feedback: FeedbacksT) => void
}

const FeedbackUser = ({
  feedbackFor,
  selectedUser,
  selectUser,
  feedback,
  index,
}: Props) => {
  const users = useContext(UserContext)
  const [hovered, setHovered] = useState(-1)

  const getUserId = () => {
    if (feedbackFor === 'me') {
      return feedback.userFrom
    } else if (feedbackFor === 'team') {
      return feedback.userTo
    }
  }
  if (!users) return <></>

  const user = users.find((u) => u.id === getUserId())
  if (!user) return null

  return (
    <li
      onClick={() => selectUser(index, user, { ...feedback })}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(-1)}
      className={classNames({
        [styles.userDefault]: ![hovered, selectedUser].includes(index),
        [styles.userHovered]: index === hovered,
        [styles.userSelected]: index === selectedUser,
      })}
    >
      <User name={user.name} avatarUrl={user.avatarUrl} />
    </li>
  )
}

export default FeedbackUser
