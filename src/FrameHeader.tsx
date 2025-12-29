import React, { CSSProperties } from 'react'
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

// const Header = styled.div<HeaderProps>`
//     background-color: #eeeeee;
//     border-bottom: 1px solid gray;
//     box-sizing: border-box;
//     cursor: move;
//     display: block;
//     height: ${props => props.$height}px;
//     line-height: ${props => props.$height}px;
// `

export const FrameHeader: React.FunctionComponent<Props> = (props) => {
  const { buttons, canvas, height, onMouseDown, title } = props

  const StyleHeader: CSSProperties = {
    backgroundColor: '#eeeeee',
    borderBottom: '1px solid gray',
    boxSizing: 'border-box',
    cursor: 'move',
    display: 'block',
    height: `${height}px`,
    lineHeight: `${height}px`,
  }

  //----------------------------------------------------------------------------------------------
  //  render
  //----------------------------------------------------------------------------------------------
  return (
    <div style={StyleHeader} onMouseDown={onMouseDown}>
      <FrameTitle title={title} />
      <FrameButtons canvas={canvas} buttons={buttons} />
    </div>
  )
}
