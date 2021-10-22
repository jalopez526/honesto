import classNames from 'classnames'
import styles from './Feedbacks/feedbacks.module.css'
import ReactTooltip from 'react-tooltip'

interface Props {
  value: number
}
const Scale = ({ value }: Props) => {
  const scale = Array(10).fill('')

  const inRange = (a: number, b: number, index: number) => {
    return [a, b].includes(value) && index + 1 <= value
  }

  return (
    <>
      <ReactTooltip className={styles.tooltip} />
      <div className={styles.scale}>
        <div className={styles.container}>
          {scale.map((p, idx) => (
            <div
              data-tip={`Scale: ` + (idx + 1)}
              key={idx}
              className={classNames(styles.scaleGray, {
                [styles.scaleGreen]: inRange(9, 10, idx),
                [styles.scaleLightGreen]: inRange(7, 8, idx),
                [styles.scaleYellow]: inRange(5, 6, idx),
                [styles.scaleOrange]: inRange(3, 4, idx),
                [styles.scaleRed]: inRange(1, 2, idx),
              })}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Scale
