import React, { CSSProperties } from 'react'
import { Canvas } from './Canvas'
import type { Button } from './Button'
import { Tooltip } from 'react-tooltip'

const StyleButtonRow: CSSProperties = {
  cursor: 'default',
  display: 'inline-block',
  float: 'right',
}

const StyleTooltipAndButton = {
  borderLeft: '2px solid red',
  borderRight: '2px solid red',
}

const StyleToolTip = {
  borderLeft: '2px solid green',
  borderRight: '2px solid green',
  display: 'inline-block',
}

const StyleButton = {
  borderLeft: '2px solid blue',
  borderRight: '2px solid blue',
  display: 'inline-block',
  height: '30px',
  width: '30px',
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
    <div style={StyleTooltipAndButton}>
      <div style={StyleToolTip} >
        tooltip
      </div>
      <div style={StyleButton} ref={ref}>
        {button.icon}
      </div>
    </div>
  )

  //----------------------------------------------------------------------------------------------
  // render
  //----------------------------------------------------------------------------------------------
  return <div style={StyleButtonRow}>{buttons.map((button) => renderTooltipAndButton(button))}</div>
}







// import React, { CSSProperties } from 'react'
// import { Canvas } from './Canvas'
// import type { Button } from './Button'
// import { Tooltip } from 'react-tooltip'
//
// // const ButtonRow = styled.div`
// //     cursor: default;
// //     display: inline-block;
// //     float: right;
// //     height: 100%;
// //     padding-right: 10px;
// // `
//
// const StyleButtonRow: CSSProperties = {
//   cursor: 'default',
//   display: 'inline-block',
//   float: 'right',
//   height: 'height',
//   paddingRight: '10px',
// }
//
// // const ButtonDiv = styled.div`
// //     display: inline-block;
// //     height: 30px;
// //     padding-left: 9px;
// //     padding-right: 9px;
// //     &:hover {
// //       background-color: lightblue;
// //       cursor: pointer;
// //     }
// // `
//
// const StyleButtonDiv: CSSProperties = {
//   display: 'inline-block',
//   height: '30px',
//   paddingLeft: '9px',
//   paddingRight: '9px',
// }
//
// type Props = {
//   buttons: Button[]
//   canvas: Canvas
// }
//
// //----------------------------------------------------------------------------------------------
// // FrameButtons
// //----------------------------------------------------------------------------------------------
// export const FrameButtons: React.FunctionComponent<Props> = (props) => {
//   const { buttons, canvas } = props
//   const { getNextKey } = canvas
//
//   //----------------------------------------------------------------------------------------------
//   // renderButtonContent
//   //----------------------------------------------------------------------------------------------
//   const renderButtonContent = (button: Button): React.JSX.Element => {
//     return (
//       <div key={getNextKey()}>
//         <div data-tooltip-id={button.tip} data-tooltip-content={button.tip}>
//           {button.icon}
//         </div>
//         <Tooltip id={button.tip} />
//       </div>
//     )
//   }
//
//   //----------------------------------------------------------------------------------------------
//   // renderButton
//   //----------------------------------------------------------------------------------------------
//   const renderButton = (button: any): React.JSX.Element => (
//     <div
//       style={ StyleButtonDiv }
//       key={getNextKey()}
//       onClick={() => {
//         button.onClick()
//       }}
//     >
//       {renderButtonContent(button)}
//     </div>
//   )
//
//   //----------------------------------------------------------------------------------------------
//   // render
//   //----------------------------------------------------------------------------------------------
//   return <div style={StyleButtonRow}>{buttons.map((button) => renderButton(button))}</div>
// }
