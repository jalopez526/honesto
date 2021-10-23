import classNames from 'classnames'
import { useState } from 'react'
import Space from '../../../../components/Space'
import styles from '../../feedBackQuestions.module.css'

export interface ScaleProps {
  label: string
  scale: number
  onScaleSelected: (scale: number) => void
}

const Scale = ({ label, scale, onScaleSelected }: ScaleProps) => {
  const [hovered, setHovered] = useState<number>(-1)
  const scaleRectangles = Array(10).fill('')

  const onClick = (idx: number) => {
    if (scale - 1 === hovered) {
      onScaleSelected(-1)
    } else {
      onScaleSelected(idx + 1)
    }
  }

  return (
    <div className={styles.scale}>
      <p>{label}</p>
      <Space marginTop="3em" marginBottom="3.5em">
        <div className={styles.sWrapper}>
          {scaleRectangles.map((p, idx) => (
            <div
              data-testid="scale"
              key={idx}
              className={classNames(styles.scaleGray, {
                [styles.scalePurple]: hovered >= idx,
                [styles.scaleDarkPurple]: scale - 1 >= idx,
              })}
              onClick={() => onClick(idx)}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(-1)}
            />
          ))}
        </div>
        <div className={styles.scaleValue} data-testid="total-scale">
          <span>
            {scale < 0 ? 0 : scale}/{scaleRectangles.length}
          </span>
        </div>
      </Space>
    </div>
  )
}

export default Scale
