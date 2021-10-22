import styles from './Feedbacks/feedbacks.module.css'
interface Props {
  label: string
}

const Skipped = ({ label }: Props) => {
  return (
    <div className={styles.skipped}>
      <div className={styles.questionLabel}>{label}</div>
      <div className={styles.skippedLabel}>
        <h3>Skipped</h3>
      </div>
    </div>
  )
}

export default Skipped
