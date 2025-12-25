import React from 'react'
import styled from 'styled-components'

const Title = styled.div`
    display: inline-block;
    float: left;
    padding-left: 4px;
  `

type Props = {
  title: string
}

export const FrameTitle: React.FunctionComponent<Props> = (props) => {
  const { title } = props
  return <Title>{title}</Title>
}
