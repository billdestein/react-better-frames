import React,  { CSSProperties } from 'react'

const StyleTitle: CSSProperties = {
  display: 'inline-block',
  float: 'left',
  paddingLeft: '4px',
}

type Props = {
  title: string
}

export const FrameTitle: React.FunctionComponent<Props> = (props) => {
  const { title } = props
  return <div style={StyleTitle}>{title}</div>
}
