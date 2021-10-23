import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Textarea from './Textarea'

describe('Textarea component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should display Textarea component', async () => {
    const onChange = jest.fn()
    const { getByTestId } = render(<Textarea onChange={onChange} value="" />)

    fireEvent.change(getByTestId('textarea'), {
      target: { value: "I'm just typing something here" },
    })
    expect(onChange).toHaveBeenCalledWith("I'm just typing something here")
  })
})
