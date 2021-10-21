import styles from './button.module.css'
import * as React from 'react'
import classnames from 'classnames'

type Props = {
  onClick: (se: React.SyntheticEvent) => void
  children: React.ReactNode
  secondary?: boolean
  disabled?: boolean
  purple?: boolean
}

const Button = (props: Props) => {
  const { children, secondary, disabled, purple, onClick } = props

  return (
    <button
      className={classnames(styles.button, {
        [styles.secondaryButton]: secondary,
        [styles.disabled]: disabled,
        [styles.purpleButton]: purple,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
