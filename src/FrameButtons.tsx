import React, { CSSProperties } from 'react'
import { Canvas } from './Canvas'
import type { Button } from './Button'
import { Tooltip } from 'react-tooltip'

const StyleButtonRow: CSSProperties = {
  cursor: 'default',
  display: 'inline-block',
  float: 'right',
}

const StyleToolTipAndButton: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  height: '30px',
}

const StyleToolTip: CSSProperties = {
  borderLeft: '2px solid green',
  borderRight: '2px solid green',
  height: '30px',
  width: '30px',
}

const StyleButton: CSSProperties = {
  alignItems: 'center',
  borderLeft: '2px solid blue',
  borderRight: '2px solid blue',
  display: 'flex',
  height: '30px',
  justifyContent: 'center',
  width: '30px'
}

const StyleInline: CSSProperties = {
  display: 'inline-block'
}

// const StyleButtonDiv: CSSProperties = {
//   display: 'inline-block',
//   height: '30px',
//   paddingLeft: '9px',
//   paddingRight: '9px',
// }
//
// const StyleToolTipWrapper: CSSProperties = {
//   backgroundColor: 'red',
//   height: '5px',
//   position: 'relative',
//   width: '5px',
// }
//
// const StyleToolTip: CSSProperties = {
//   border: '3px solid green',
//   position: 'absolute',
//   top: '-30px',
//   width: '50px'
// }

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
      element.style.backgroundColor = "lightblue";
      element.style.color = "black";
      console.log("Mouse entered!");
    }

    // Function to run when the mouse leaves the element
    function handleMouseLeave() {
      element.style.backgroundColor = "initial"; // Resets to original
      element.style.color = "initial";
      console.log("Mouse left!");
    }

    // Attach the event listeners
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
  }

  //----------------------------------------------------------------------------------------------
  // renderButton
  //----------------------------------------------------------------------------------------------
  // const renderButton = (button: any): React.JSX.Element => (
  //   <div
  //     style={ StyleButtonDiv }
  //     key={getNextKey()}
  //     onClick={() => {
  //       button.onClick()
  //     }}
  //     ref={ref}
  //   >
  //     <div style={StyleToolTipWrapper}>
  //       <div style={StyleToolTip}>
  //         Some tool tip
  //       </div>
  //     </div>
  //     {button.icon}
  //   </div>
  // )

  //----------------------------------------------------------------------------------------------
  // renderTooltipAndButton
  //----------------------------------------------------------------------------------------------
  const renderTooltipAndButton = (button: any): React.JSX.Element => (
    <div style={StyleToolTipAndButton}>
      <div style={StyleInline}>
        <div style={StyleToolTip} />
      </div>
      <div style={StyleInline}>
        <div style={StyleButton} ref={ref}>
          {button.icon}
        </div>
      </div>
    </div>
  )

  //----------------------------------------------------------------------------------------------
  // render
  //----------------------------------------------------------------------------------------------
  return <div style={StyleButtonRow}>{buttons.map((button) => renderTooltipAndButton(button))}</div>
}

