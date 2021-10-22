import styles from './notFound.module.css'

const NoFeedbackFound = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.texts}>
        <h1>No feedback to display</h1>
        <span>
          There is no feedback to display at this time - check back in a bit!
        </span>
      </div>
    </div>
  )
}

export default NoFeedbackFound
