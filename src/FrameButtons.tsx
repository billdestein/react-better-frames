import React from 'react'
import styled from 'styled-components'
import Canvas from './Canvas'
import type { Button } from './Button'
import { Tooltip } from 'react-tooltip'

const ButtonRow = styled.div`
    cursor: default;
    display: inline-block;
    float: right;
    height: 100%;
    padding-right: 10px;
`

const ButtonDiv = styled.div`
    display: inline-block;
    height: 30px;
    padding-left: 9px;
    padding-right: 9px;
    &:hover {
      background-color: lightblue;
      cursor: pointer;
    }
`

type Props = {
  buttons: Button[]
  canvas: Canvas
}

//----------------------------------------------------------------------------------------------
// FrameButtons
//----------------------------------------------------------------------------------------------
const FrameButtons: React.FunctionComponent<Props> = (props) => {
  const { buttons, canvas } = props
  const { getNextKey } = canvas

  //----------------------------------------------------------------------------------------------
  // renderButtonContent
  //----------------------------------------------------------------------------------------------
  const renderButtonContent = (button: Button): React.JSX.Element => {
    return (
      <div key={getNextKey()}>
        <div data-tooltip-id={button.tip} data-tooltip-content={button.tip}>
          {button.icon}
        </div>
        <Tooltip id={button.tip} />
      </div>
    )
  }

  //----------------------------------------------------------------------------------------------
  // renderButton
  //----------------------------------------------------------------------------------------------
  const renderButton = (button: any): React.JSX.Element => (
    <ButtonDiv
      key={getNextKey()}
      onClick={() => {
        button.onClick()
      }}
    >
      {renderButtonContent(button)}
    </ButtonDiv>
  )

  //----------------------------------------------------------------------------------------------
  // render
  //----------------------------------------------------------------------------------------------
  return <ButtonRow>{buttons.map((button) => renderButton(button))}</ButtonRow>
}

export default FrameButtons
