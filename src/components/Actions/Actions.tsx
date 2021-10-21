import React, { useContext } from 'react'
import Button from '../Button'
import { FeedbacksContext } from '../../context/FeedbackProvider'
import styles from './actions.module.css'

interface Props {
  onBack: (e: React.SyntheticEvent) => void
  onForward: (e: React.SyntheticEvent) => void
  onSkip: (e: React.SyntheticEvent) => void
  isDisabled: boolean
  isRequired: boolean
}
const Actions = ({
  onBack,
  onSkip,
  onForward,
  isDisabled,
  isRequired,
}: Props) => {
  const feedbacks = useContext(FeedbacksContext)
  return (
    <div className={styles.buttons}>
      <Button secondary onClick={onBack}>
        Previous
      </Button>
      {!isRequired && (
        <Button secondary onClick={onSkip}>
          Skip
        </Button>
      )}
      <Button purple={!isDisabled} disabled={isDisabled} onClick={onForward}>
        Next
      </Button>
    </div>
  )
}

export default Actions
