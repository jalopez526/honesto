import styles from '../../feedBackQuestions.module.css'

export interface TextareaProps {
  onChange: (str: string) => void
  value: string
}

const Textarea = ({ value, onChange }: TextareaProps) => {
  return (
    <textarea
      data-testid="textarea"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={styles.textarea}
      rows={4}
      cols={50}
      placeholder="Say something"
    />
  )
}
export default Textarea
