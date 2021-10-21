import classNames from 'classnames'
import { useState } from 'react'
import Space from '../../../components/Space'
import styles from '../feedBackQuestions.module.css'

interface Props {
  label: string
  store: (payload: string | number, callback?: Function) => void
  setIsDisable: (bool: boolean) => void
}

const Scale = ({ label, setIsDisable, store }: Props) => {
  const [hovered, setHovered] = useState<number>(-1)
  const [selected, setSelected] = useState<number>(-1)
  const scale = Array(10).fill('')

  const storeFeedback = (idx: number) => {
    setSelected(idx)
    setIsDisable(false)
    store(idx + 1)
  }

  return (
    <div className={styles.scale}>
      <p>{label}</p>
      <Space marginTop="3em" marginBottom="3.5em">
        <div className={styles.sWrapper}>
          {scale.map((p, idx) => (
            <div
              key={idx}
              className={classNames(styles.scaleGray, {
                [styles.scalePurple]: hovered >= idx,
                [styles.scaleDarkPurple]: selected >= idx,
              })}
              onClick={() => {
                if (selected === hovered) {
                  setSelected(-1)
                  setIsDisable(true)
                } else {
                  storeFeedback(idx)
                }
              }}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(-1)}
            />
          ))}
        </div>
        <div className={styles.scaleValue}>
          <span>
            {selected + 1}/{scale.length}
          </span>
        </div>
      </Space>
    </div>
  )
}

export default Scale
