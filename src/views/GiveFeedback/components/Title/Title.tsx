import Space from '../../../../components/Space'
import styles from './title.module.css'

interface Props {
  feedbackCompleted?: boolean
}

const Title = ({ feedbackCompleted }: Props) => {
  const title = feedbackCompleted
    ? 'Thank you for sharing your feedback!'
    : 'Share Feedback'
  return (
    <>
      <h1>{title}</h1>
      <Space marginBottom="1em">
        {feedbackCompleted ? (
          <p className={styles.subtitle}>
            Continue to give feedback to other team members.
          </p>
        ) : (
          <></>
        )}
      </Space>
    </>
  )
}

export default Title
