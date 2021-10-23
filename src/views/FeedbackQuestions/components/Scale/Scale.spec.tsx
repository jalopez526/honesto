import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Scale from './Scale'

describe('Scale component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should display Scale component', async () => {
    const onScaleSelected = jest.fn()
    const { getByText } = render(
      <Scale label="Some label" onScaleSelected={onScaleSelected} scale={-1} />,
    )

    expect(getByText('Some label')).toBeInTheDocument()
  })
  test('should fire onClick and select scale', async () => {
    const onScaleSelected = jest.fn()
    const { getAllByTestId } = render(
      <Scale label="Some label" onScaleSelected={onScaleSelected} scale={-1} />,
    )

    const scales = getAllByTestId('scale')

    fireEvent.click(scales[7])

    expect(onScaleSelected).toHaveBeenCalledTimes(1)
    expect(onScaleSelected).toHaveBeenCalledWith(8)
  })

  test('should select and deselect the scale if clicking at the same one', async () => {
    const onScaleSelected = jest.fn()
    const { getAllByTestId, rerender } = render(
      <Scale label="Some label" onScaleSelected={onScaleSelected} scale={-1} />,
    )

    const scales = getAllByTestId('scale')
    fireEvent.click(scales[1])
    const selectedScale = 2
    expect(onScaleSelected).toHaveBeenCalledWith(selectedScale)

    rerender(
      <Scale label="Some label" onScaleSelected={onScaleSelected} scale={2} />,
    )

    const deSelectedScale = -1
    fireEvent.mouseOver(scales[1])
    fireEvent.click(scales[1])
    expect(onScaleSelected).toHaveBeenCalledWith(deSelectedScale)
    expect(onScaleSelected).toHaveBeenCalledTimes(2)
  })

  test('should set total scale', async () => {
    const onScaleSelected = jest.fn()
    const totalScale = 10
    const scale = 9
    const { getByText } = render(
      <Scale
        label="Some label"
        onScaleSelected={onScaleSelected}
        scale={scale}
      />,
    )
    expect(getByText(`${scale}/${totalScale}`)).toBeInTheDocument()
  })
})
