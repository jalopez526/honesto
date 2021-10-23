import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import User from './User'

describe('User component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should user with avatar and name', async () => {
    const { getByTestId, getByText } = render(<User avatarUrl="https://i.pravatar.cc/100?u=p2" name="User"/>)

    
    expect(getByTestId('user-avatar')).toBeInTheDocument();
    expect(getByText('User')).toBeInTheDocument();
  })

  test('initials should not be in the document if avatar is present ', async () => {
    const { queryByTestId } = render(<User avatarUrl="https://i.pravatar.cc/100?u=p2" name="User"/>)

    
    expect(queryByTestId('user-initials')).not.toBeInTheDocument();
  })

  test('initials should be presents if avatar is not present', async () => {
    const { getByText} = render(<User name="User Lopez"/>)

    expect(getByText('UL')).toBeInTheDocument()
  })

  test('should show only the avatar', async () => {
    const { queryByTestId, getByTestId } = render(<User avatarUrl="https://i.pravatar.cc/100?u=p2" />)

    expect(getByTestId('user-avatar')).toBeInTheDocument();
    expect(queryByTestId('user-initials')).not.toBeInTheDocument();
  })
})
