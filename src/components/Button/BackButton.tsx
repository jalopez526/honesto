import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import styles from './button.module.css'
import { MouseEventHandler } from 'react'

interface Props {
  onClick: MouseEventHandler<HTMLSpanElement>
}

const BackButton = ({ onClick }: Props) => {
  return (
    <span className={styles.back} onClick={onClick}>
      <FontAwesomeIcon icon={faChevronLeft} />
      <span>Back</span>
    </span>
  )
}

export default BackButton
