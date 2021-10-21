interface Props {
  background?: string
  completed: number
}

const ProgressBar = ({
  background = 'linear-gradient(#1DDEBB, #98FFFB)',
  completed,
}: Props) => {
  const containerStyles = {
    height: 6,
    width: '100%',
    backgroundColor: '#F2F3F4',
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    background,
    borderRadius: '4px',
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles} />
    </div>
  )
}

export default ProgressBar
