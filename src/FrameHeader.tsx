import React from 'react'
import styled from 'styled-components'
import type { Button } from './Button'
import { Canvas } from './Canvas'
import { FrameButtons  } from './FrameButtons'
import { FrameTitle } from './FrameTitle'

type Props = {
  buttons: Button[]
  canvas: Canvas
  height: number
  onMouseDown: (event: any) => void
  title: string
}

interface HeaderProps {
  readonly $height: number
}

const Header = styled.div<HeaderProps>`
    background-color: #eeeeee;
    border-bottom: 1px solid gray;
    box-sizing: border-box;
    cursor: move;
    display: block;
    height: ${props => props.$height}px;
    line-height: ${props => props.$height}px;
`

export const FrameHeader: React.FunctionComponent<Props> = (props) => {
  const { buttons, canvas, height, onMouseDown, title } = props

  //----------------------------------------------------------------------------------------------
  //  render
  //----------------------------------------------------------------------------------------------
  return (
    <Header $height={height} onMouseDown={onMouseDown}>
      <FrameTitle title={title} />
      <FrameButtons canvas={canvas} buttons={buttons} />
    </Header>
  )
}
