import classNames from 'classnames'
import { useEffect, useState } from 'react'
import styles from '../feedBackQuestions.module.css'

interface Props {
  options: {
    value: number
    label: string
  }[]
  setIsDisable: (s: boolean) => void
  store: (payload: string | number, callback?: Function) => void
}

const MultipleChoice = ({ options, setIsDisable, store }: Props) => {
  const [selected, setSelected] = useState<number>(0)
  useEffect(() => {
    setIsDisable(selected <= 0)
  }, [selected])

  const save = (value: number) => {
    setSelected(value)
    store(value)
  }

  return (
    <>
      {options?.map((option) => (
        <div
          key={option.value}
          onClick={() => save(option.value)}
          className={classNames(styles.multipleOptions, {
            [styles.multipleOptionSelected]: selected === option.value,
          })}
        >
          <p>{option.label}</p>
        </div>
      ))}
    </>
  )
}

export default MultipleChoice
