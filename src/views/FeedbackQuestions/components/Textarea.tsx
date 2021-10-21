import { useEffect, useState } from 'react'
import styles from '../feedBackQuestions.module.css'

interface Props {
  setIsDisable: (s: boolean) => void
  store: (payload: string | number, callback?: Function) => void
}

const Textarea = ({ setIsDisable, store }: Props) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    setIsDisable(!value)
  }, [value, setIsDisable])

  const save = (value: string) => {
    setValue(value)
    store(value)
  }

  return (
    <textarea
      value={value}
      onChange={(e) => save(e.target.value)}
      className={styles.textarea}
      rows={4}
      cols={50}
      placeholder="Say something"
    />
  )
}
export default Textarea
