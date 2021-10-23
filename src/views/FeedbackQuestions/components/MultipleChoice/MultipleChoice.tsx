import classNames from 'classnames'
import styles from '../../feedBackQuestions.module.css'

export interface Option {
  value: number
  label: string
}

export interface MultipleChoiceProps {
  options: Option[]
  onOptionSelected: (option: Option) => void
  option: Option
}

const MultipleChoice = ({
  options,
  onOptionSelected,
  option,
}: MultipleChoiceProps) => {
  return (
    <>
      {options?.map((o) => (
        <div
          data-testid="multiple-choice"
          key={o.value}
          onClick={() => onOptionSelected(o)}
          className={classNames(styles.multipleOptions, {
            [styles.multipleOptionSelected]: option.value === o.value,
          })}
        >
          <p>{o.label}</p>
        </div>
      ))}
    </>
  )
}

export default MultipleChoice
