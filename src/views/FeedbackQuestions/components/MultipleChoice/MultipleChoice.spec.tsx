import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import MultipleChoice from './MultipleChoice'

describe('MultipleChoice component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const options = [
    {
      value: 1,
      label: 'option 1',
    },
    {
      value: 2,
      label: 'option 2',
    },
    {
      value: 3,
      label: 'option 3',
    },
  ]
  const defaultOption = { label: '', value: 0 }

  test('should display 3 options', async () => {
    const onOptionSelected = jest.fn()
    const { getAllByTestId } = render(
      <MultipleChoice
        options={options}
        onOptionSelected={onOptionSelected}
        option={defaultOption}
      />,
    )

    const uiOptions: any = getAllByTestId('multiple-choice')

    expect(uiOptions).toHaveLength(3)
  })

  test('should fire onOptionSelected event with selected option as callback', async () => {
    const onOptionSelected = jest.fn()
    const { getAllByTestId } = render(
      <MultipleChoice
        options={options}
        onOptionSelected={onOptionSelected}
        option={defaultOption}
      />,
    )

    const uiOptions: any = getAllByTestId('multiple-choice')
    // selecting first option to fireEvent
    fireEvent.click(uiOptions[0])
    expect(onOptionSelected).toHaveBeenCalledWith({
      value: 1,
      label: 'option 1',
    })
  })
})
