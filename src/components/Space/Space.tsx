import React from 'react'

interface Props {
  [key: string]: string | React.ReactElement | React.ReactElement[]
}

const Space = (props: Props) => {
  return <div style={{ ...props }}>{props.children}</div>
}

export default Space
