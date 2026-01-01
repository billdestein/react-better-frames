import React, { CSSProperties } from 'react'
import { Canvas } from './Canvas'
import type { Button } from './Button'

const StyleButtonRow: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  float: 'right',
}

const StyleToolTipAndButton: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  height: '30px',
}

const StyleToolTipWrapper: CSSProperties = {
  display: 'none',
  position: 'relative',
  width: '0px',
}

const StyleToolTipAbsolute: CSSProperties = {
  backgroundColor: 'lightgray',
  color: 'black',
  display: 'inline-block',
  paddingLeft: '5px',
  paddingRight: '5px',
  position: 'absolute',
  top: '-35px',
}

const StyleToolTipRelative: CSSProperties = {
  position: 'relative',
}

const StyleButton: CSSProperties = {
  alignItems: 'center',
  cursor: 'pointer',
  display: 'flex',
  height: '30px',
  justifyContent: 'center',
  width: '30px'
}

type Props = {
  buttons: Button[]
  canvas: Canvas
}

//----------------------------------------------------------------------------------------------
// FrameButtons
//----------------------------------------------------------------------------------------------
export const FrameButtons: React.FunctionComponent<Props> = (props) => {
  const { buttons, canvas } = props
  const { getNextKey } = canvas

  //----------------------------------------------------------------------------------------------
  // ref
  //----------------------------------------------------------------------------------------------
  const ref = (element: any)=> {
    console.log('ref')
    if (element === null) {
      return
    }

    const hoverBox = document.getElementById("hover-box");

    // Function to run when the mouse enters the element
    function handleMouseEnter() {
      element.style.backgroundColor = "lightgray";
      element.style.color = "black";
      const toolTipDiv = element.previousElementSibling
      toolTipDiv.style.display = "inline-block"
      console.log("Mouse entered!");
    }

    // Function to run when the mouse leaves the element
    function handleMouseLeave() {
      element.style.backgroundColor = "initial"; // Resets to original
      element.style.color = "initial";
      const toolTipDiv = element.previousElementSibling
      toolTipDiv.style.display = "none"
      console.log("Mouse left!");
    }

    // Attach the event listeners
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
  }

  //----------------------------------------------------------------------------------------------
  // renderTooltipAndButton
  //----------------------------------------------------------------------------------------------
  const renderTooltipAndButton = (button: any): React.JSX.Element => (
    <div style={StyleToolTipAndButton}>
      <div style={StyleToolTipWrapper} >
        <div style={StyleToolTipRelative}/>
        <div style={StyleToolTipAbsolute}>
          {button.tip}
        </div>
      </div>
      <div style={StyleButton} onClick={button.onClick} ref={ref}>
        {button.icon}
      </div>
    </div>
  )

  //----------------------------------------------------------------------------------------------
  // render
  //----------------------------------------------------------------------------------------------
  return <div style={StyleButtonRow}>{buttons.map((button) => renderTooltipAndButton(button))}</div>
}

