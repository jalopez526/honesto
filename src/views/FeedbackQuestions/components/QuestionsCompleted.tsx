import Space from '../../../components/Space'
import styles from '../feedBackQuestions.module.css'

interface Props {
  current: number
  total: number
}

const QuestionsCompleted = ({ current, total }: Props) => {
  return (
    <Space marginTop="1em" marginBottom="1em">
      <div className={styles.questionsCompleted}>
        <p>Questions Completed</p>
        <span>
          {current}/{total}
        </span>
      </div>
    </Space>
  )
}

export default QuestionsCompleted
