import React, { CSSProperties } from 'react'
import {debounce } from 'lodash'
import type { ReactElement } from 'react'
import styled from 'styled-components'
import { Button } from './Button'
import { Canvas } from './Canvas'
import { Geometry } from './Geometry'
import { FrameHeader } from './FrameHeader'

enum Resizer {
  NONE = 'none',
  NW = 'nw',
  N = 'n',
  NE = 'ne',
  W = 'w',
  E = 'e',
  SW = 'sw',
  S = 's',
  SE = 'se'
}

interface BodyCoverProps {
  readonly $geometry: Geometry
}

const BodyCover = styled.div<BodyCoverProps>`
    height: ${props=> props.$geometry.height}px;
    left: 0;
    position: absolute;
    top: 0;
    width: ${props=> props.$geometry.width}px;
`

const Content = styled.div`
    display: flex;
    flex-flow: column;
    position: relative;
    height: 100%;
`

const FrameBody = styled.div`
    flex: 1;
    overflow: hidden;
    position: relative;
`

interface DivProps {
  readonly $minusThicknessPX: string
  readonly $thicknessPX: string
}


const NW = styled.div<DivProps>`
    position: absolute;
    cursor: nwse-resize;
    top: ${props => props.$minusThicknessPX};
    left: ${props => props.$minusThicknessPX};
    height: ${props => props.$thicknessPX};
    width: ${props => props.$thicknessPX};
    z-index: 2;
`

const N = styled.div<DivProps>`
    position: absolute;
    cursor: ns-resize;
    top: ${props => props.$minusThicknessPX};
    left: 0;
    height: ${props => props.$thicknessPX};
    width: 100%;
    z-index: 2;
`

const NE = styled.div<DivProps>`
    position: absolute;
    cursor: nesw-resize;
    top: ${props => props.$minusThicknessPX};
    left: 100%;
    height: ${props => props.$thicknessPX};
    width: ${props => props.$thicknessPX};
    z-index: 2;
`

const W = styled.div<DivProps>`
    position: absolute;
    cursor: ew-resize;
    top: 0;
    left: ${props => props.$minusThicknessPX};
    height: 100%;
    width: ${props => props.$thicknessPX};
    z-index: 2;
`

const E = styled.div<DivProps>`
    position: absolute;
    cursor: ew-resize;
    top: 0;
    left: 100%;
    height: 100%;
    width: ${props => props.$thicknessPX};
    z-index: 2;
`

const SW = styled.div<DivProps>`
    position: absolute;
    cursor: nesw-resize;
    top: 100%;
    left: ${props => props.$minusThicknessPX};
    height: ${props => props.$thicknessPX};
    width: ${props => props.$thicknessPX};
    z-index: 2;
`

const S = styled.div<DivProps>`
    position: absolute;
    cursor: ns-resize;
    top: 100%;
    left: 0;
    height: ${props => props.$thicknessPX};
    width: 100%;
    z-index: 2;
`

const SE = styled.div<DivProps>`
    position: absolute;
    cursor: nwse-resize;
    top: 100%;
    left: 100%;
    height: ${props => props.$thicknessPX};
    width: ${props => props.$thicknessPX};
    z-index: 2;
`

interface WrapperProps {
  readonly $geometry: Geometry
}

const Wrapper = styled.div<WrapperProps>`
    background-color: #EEEEEE;
    box-sizing: border-box;
    border: 5px solid white;
    color: #222222;
    outline: 1px solid black;
    height: ${props=> props.$geometry.height}px;
    left: ${props => props.$geometry.x}px;
    position: absolute;
    top: ${props => props.$geometry.y}px;
    width: ${props => props.$geometry.width}px;
    z-index: ${props => props.$geometry.z};
`

interface Props {
  buttons: Button[]
  canvas: Canvas
  children: ReactElement
  geometry: Geometry
  isIframe?: boolean
  onResize: (_geometry: Geometry) => void
  title: string
}

//----------------------------------------------------------------------------------------------
// Frame
//----------------------------------------------------------------------------------------------
export const Frame: React.FC<Props> = (props) => {
  const {buttons, canvas, geometry, onResize, title } = props

  const wrapperId = `${Math.random()}`
  const bodyId = `${Math.random()}`
  const headerHeight = 30
  const thickness = 20
  const thicknessPX = `${thickness}px`
  const minusThicknessPX = `${-1 * thickness}px`
  let mouseStartX: number = 0
  let mouseStartY: number = 0
  let resizer: Resizer = Resizer.NONE
  let wrapperStartHeight: number = 0
  let wrapperStartWidth: number = 0
  let wrapperStartX: number = 0
  let wrapperStartY: number = 0

  const StyleNW: CSSProperties = {
    position: 'absolute',
    cursor: 'nwse-resize',
    top: minusThicknessPX,
    left: minusThicknessPX,
    height: thicknessPX,
    width: thicknessPX,
    zIndex: 2,
  }

  const StyleN: CSSProperties = {
    position: 'absolute',
    cursor: 'ns-resize',
    top: minusThicknessPX,
    left: 0,
    height: thicknessPX,
    width: '100%',
    zIndex: 2,
  }

  const StyleNE: CSSProperties = {
    position: 'absolute',
    cursor: 'nesw-resize',
    top: minusThicknessPX,
    left: '100%',
    height: thicknessPX,
    width: thicknessPX,
    zIndex: 2,
  }

  const StyleW: CSSProperties = {
    position: 'absolute',
    cursor: 'ew-resize',
    top: 0,
    left: minusThicknessPX,
    height: '100%',
    width: thicknessPX,
    zIndex: 2,
  }

  const StyleE: CSSProperties = {
    position: 'absolute',
    cursor: 'ew-resize',
    top: 0,
    left: '100%',
    height: '100%',
    width: thicknessPX,
    zIndex: 2,
  }

  const StyleSW: CSSProperties = {
    position: 'absolute',
    cursor: 'nesw-resize',
    top: '100%',
    left: minusThicknessPX,
    height: thicknessPX,
    width: thicknessPX,
    zIndex: 2,
  }

  const StyleS: CSSProperties = {
    position: 'absolute',
    cursor: 'ns-resize',
    top: '100%',
    left: 0,
    height: thicknessPX,
    width: '100%',
    zIndex: 2,
  }

  const StyleSE: CSSProperties = {
    position: 'absolute',
    cursor: 'nwse-resize',
    top: '100%',
    left: '100%',
    height: thicknessPX,
    width: thicknessPX,
    zIndex: 2,
  }

  //-----------------------------------------------------------------------------------------------
  // dragPointerDown
  //-----------------------------------------------------------------------------------------------
  const dragPointerDown = (event: any): void => {
    event.preventDefault()

    const bodyElement = document.getElementById(bodyId)
    if (!bodyElement) {
      alert('cannot find bodyElement')
      return
    }

    const canvasElement = document.getElementById(canvas.getId())
    if (!canvasElement) {
      alert('cannot find canvasElement')
      return
    }

    const wrapperElement = document.getElementById(wrapperId)
    if (!wrapperElement) {
      alert('cannot find wrapperElement')
      return
    }

    if (props.isIframe && props.isIframe ) {
      bodyElement.style.display = 'none'
    }

    restack()

    mouseStartX = event.clientX
    mouseStartY = event.clientY

    wrapperStartX = getLeft(wrapperElement)
    wrapperStartY = getTop(wrapperElement)

    document.addEventListener('pointermove', dragPointerMove, false)
    document.addEventListener('pointerup', dragPointerUp, false)
    document.addEventListener('pointercancel', dragPointerCancel, false)
  }

  //-----------------------------------------------------------------------------------------------
  // dragPointerMove
  //-----------------------------------------------------------------------------------------------
  const dragPointerMove = (event: any): void => {
    event.preventDefault()

    const canvasElement = document.getElementById(canvas.getId())
    if (!canvasElement) {
      alert('cannot find canvasElement')
      return
    }

    const wrapperElement = document.getElementById(wrapperId)
    if (!wrapperElement) {
      alert('cannot find wrapperElement')
      return
    }

    const mouseX: number = event.clientX
    const mouseY: number = event.clientY

    let newWrapperX = wrapperStartX + (mouseX - mouseStartX)
    let newWrapperY = wrapperStartY + (mouseY - mouseStartY)

    if (newWrapperY < 0) {
      newWrapperY = 0;
    }

    if (newWrapperY > canvasElement.offsetHeight - wrapperElement.offsetHeight - 30) {
      newWrapperY = canvasElement.offsetHeight - wrapperElement.offsetHeight - 30;
    }

    if (newWrapperX < 0) {
      newWrapperX = 0
    }

    if (newWrapperX + wrapperElement.offsetWidth > canvasElement.offsetWidth - 30) {
      newWrapperX = canvasElement.offsetWidth - wrapperElement.offsetWidth - 30
    }

    setLeft(wrapperElement, newWrapperX)
    setTop(wrapperElement, newWrapperY)

    resize()
  }

  //-----------------------------------------------------------------------------------------------
  // dragPointerUp
  //-----------------------------------------------------------------------------------------------
  const dragPointerUp = (event: any): void => {
    event.preventDefault()

    const bodyElement = document.getElementById(bodyId)
    if (!bodyElement) {
      alert('cannot find bodyElement')
      return
    }

    const canvasElement = document.getElementById(canvas.getId())
    if (!canvasElement) {
      alert('cannot find canvasElement')
      return
    }

    const wrapperElement = document.getElementById(wrapperId)
    if (!wrapperElement) {
      alert('cannot find wrapperElement')
      return
    }

    if (props.isIframe && props.isIframe ) {
      bodyElement.style.display = 'block'
    }

    document.removeEventListener('pointermove', dragPointerMove, false)
    document.removeEventListener('pointerup', dragPointerUp, false)
    document.removeEventListener('pointercancel', dragPointerCancel, false)
  }

  //-----------------------------------------------------------------------------------------------
  // dragPointerCancel
  //-----------------------------------------------------------------------------------------------
  const dragPointerCancel = (event: any): void => {
    event.preventDefault()

    const bodyElement = document.getElementById(bodyId)
    if (!bodyElement) {
      alert('cannot find bodyElement')
      return
    }

    const canvasElement = document.getElementById(canvas.getId())
    if (!canvasElement) {
      alert('cannot find canvasElement')
      return
    }

    const wrapperElement = document.getElementById(wrapperId)
    if (!wrapperElement) {
      alert('cannot find wrapperElement')
      return
    }

    if (props.isIframe && props.isIframe ) {
      bodyElement.style.display = 'block'
    }

    document.removeEventListener('pointermove', dragPointerMove, false)
    document.removeEventListener('pointerup', dragPointerUp, false)
    document.removeEventListener('pointercancel', dragPointerCancel, false)
  }

  //----------------------------------------------------------------------------------------------
  // getHeight
  //----------------------------------------------------------------------------------------------
  const getHeight = (element: any): number => {
    const computedStyle = window.getComputedStyle(element)
    return parseInt(computedStyle.height.replace('.px', ''), 10)
  }

  //----------------------------------------------------------------------------------------------
  // getWidth
  //----------------------------------------------------------------------------------------------
  const getWidth = (element: any): number => {
    const computedStyle = window.getComputedStyle(element)
    return parseInt(computedStyle.width.replace('.px', ''), 10)
  }

  //----------------------------------------------------------------------------------------------
  // getLeft
  //----------------------------------------------------------------------------------------------
  const getLeft = (element: any): number => {
    const computedStyle = window.getComputedStyle(element)
    return parseInt(computedStyle.left.replace('.px', ''), 10)
  }

  //----------------------------------------------------------------------------------------------
  // getTop
  //----------------------------------------------------------------------------------------------
  const getTop = (element: any): number => {
    const computedStyle = window.getComputedStyle(element)
    return parseInt(computedStyle.top.replace('.px', ''), 10)
  }

  //-----------------------------------------------------------------------------------------------
  // resize
  //-----------------------------------------------------------------------------------------------
  const resize = (): any => {
    if (!onResize) {
      return
    }

    const debouncedFunc = debounce(() => {
      onResize(geometry)
    }, 200)

    debouncedFunc()
  }

  //----------------------------------------------------------------------------------------------
  // resizePointerDown
  //----------------------------------------------------------------------------------------------
  const resizePointerDown = (event: any, resizerArg: Resizer): void => {
    event.preventDefault()

    const bodyElement = document.getElementById(bodyId)
    if (!bodyElement) {
      alert('cannot find bodyElement')
      return
    }

    const canvasElement = document.getElementById(canvas.getId())
    if (!canvasElement) {
      alert('cannot find canvasElement')
      return
    }

    const wrapperElement = document.getElementById(wrapperId)
    if (!wrapperElement) {
      alert('cannot find wrapperElement')
      return
    }

    if (props.isIframe && props.isIframe ) {
      bodyElement.style.display = 'none'
    }

    resizer = resizerArg

    mouseStartX = event.clientX
    mouseStartY = event.clientY

    wrapperStartHeight = getHeight(wrapperElement)
    wrapperStartWidth = getWidth(wrapperElement)

    wrapperStartX = getLeft(wrapperElement)
    wrapperStartY = getTop(wrapperElement)

    document.addEventListener('pointermove', resizePointerMove, false)
    document.addEventListener('pointerup', resizePointerUp, false)
    document.addEventListener('pointercancel', resizePointerCancel, false)
  }

  //-----------------------------------------------------------------------------------------------
  // resizePointerMove
  //-----------------------------------------------------------------------------------------------
  const resizePointerMove = (event: any): void => {
    event.preventDefault()

    const canvasElement = document.getElementById(canvas.getId())
    if (!canvasElement) {
      alert('cannot find canvasElement')
      return
    }

    const wrapperElement = document.getElementById(wrapperId)
    if (!wrapperElement) {
      alert('cannot find wrapperElement')
      return
    }

    const mouseX = event.clientX
    const mouseY = event.clientY

    let top = wrapperElement.offsetTop
    let left = wrapperElement.offsetLeft
    let height = wrapperElement.offsetHeight
    let width = wrapperElement.offsetWidth

    switch (resizer) {
      case Resizer.NW: {
        top = wrapperStartY + (mouseY - mouseStartY)
        height = wrapperStartHeight - (mouseY - mouseStartY)
        left = wrapperStartX + (mouseX - mouseStartX)
        width = wrapperStartWidth - (mouseX - mouseStartX)
        break
      }
      case Resizer.N: {
        top = wrapperStartY + (mouseY - mouseStartY)
        height = wrapperStartHeight - (mouseY - mouseStartY)
        break
      }
      case Resizer.NE: {
        top = wrapperStartY + (mouseY - mouseStartY)
        height = wrapperStartHeight - (mouseY - mouseStartY)
        width = wrapperStartWidth + (mouseX - mouseStartX)
        break
      }
      case Resizer.W: {
        left = wrapperStartX + (mouseX - mouseStartX)
        width = wrapperStartWidth - (mouseX - mouseStartX)
        break
      }
      case Resizer.E: {
        width = wrapperStartWidth + (mouseX - mouseStartX)
        break
      }
      case Resizer.SW: {
        height = wrapperStartHeight + (mouseY - mouseStartY)
        left = wrapperStartX + (mouseX - mouseStartX)
        width = wrapperStartWidth - (mouseX - mouseStartX)
        break
      }
      case Resizer.S: {
        height = wrapperStartHeight + (mouseY - mouseStartY)
        break
      }
      case Resizer.SE: {
        height = wrapperStartHeight + (mouseY - mouseStartY)
        width = wrapperStartWidth + (mouseX - mouseStartX)
        break
      }
      default: {
        break
      }
    }

    setHeight(wrapperElement, height)
    setWidth(wrapperElement, width)
    setLeft(wrapperElement, left)
    setTop(wrapperElement, top)

    resize()
  }

  //-----------------------------------------------------------------------------------------------
  // resizePointerUp
  //-----------------------------------------------------------------------------------------------
  const resizePointerUp = (event: any): void => {
    event.preventDefault()

    const bodyElement = document.getElementById(bodyId)
    if (!bodyElement) {
      alert('cannot find bodyElement')
      return
    }

    const canvasElement = document.getElementById(canvas.getId())
    if (!canvasElement) {
      alert('cannot find canvasElement')
      return
    }

    const wrapperElement = document.getElementById(wrapperId)
    if (!wrapperElement) {
      alert('cannot find wrapperElement')
      return
    }

    if (props.isIframe && props.isIframe) {
      bodyElement.style.display = 'block'
    }

    document.removeEventListener('pointermove', resizePointerMove, false)
    document.removeEventListener('pointerup', resizePointerUp, false)
    document.removeEventListener('pointercancel', resizePointerCancel, false)
  }

  //-----------------------------------------------------------------------------------------------
  // resizePointerCancel
  //-----------------------------------------------------------------------------------------------
  const resizePointerCancel = (event: any): void => {
    event.preventDefault()

    const bodyElement = document.getElementById(bodyId)
    if (!bodyElement) {
      alert('cannot find bodyElement')
      return
    }

    const canvasElement = document.getElementById(canvas.getId())
    if (!canvasElement) {
      alert('cannot find canvasElement')
      return
    }

    const wrapperElement = document.getElementById(wrapperId)
    if (!wrapperElement) {
      alert('cannot find wrapperElement')
      return
    }

    if (props.isIframe && props.isIframe) {
      bodyElement.style.display = 'block'
    }

    document.removeEventListener('pointermove', resizePointerMove, false)
    document.removeEventListener('pointerup', resizePointerUp, false)
    document.removeEventListener('pointercancel', resizePointerCancel, false)
  }

  //----------------------------------------------------------------------------------------------
  // restack
  //----------------------------------------------------------------------------------------------
  const restack = (): void => {
    const wrapperElement = document.getElementById(wrapperId)
    if (!wrapperElement) {
      return
    }

    canvas.lastZ += 1
    setZ(wrapperElement, canvas.lastZ)

    let bodyCoverElements = document.querySelectorAll('.BodyCover')
    bodyCoverElements.forEach((e) => (e as any).style.display='block')

    bodyCoverElements = wrapperElement.querySelectorAll('.BodyCover')
    bodyCoverElements.forEach((e) => (e as any).style.display='none')
  }

  //----------------------------------------------------------------------------------------------
  // setHeight
  //----------------------------------------------------------------------------------------------
  const setHeight = (element: any, height: number): void => {
    geometry.height = height
    // eslint-disable-next-line no-param-reassign
    element.style.height = `${height}px`
  }

  //----------------------------------------------------------------------------------------------
  // setLeft
  //----------------------------------------------------------------------------------------------
  const setLeft = (element: any, left: number): void => {
    geometry.x = left
    // eslint-disable-next-line no-param-reassign
    element.style.left = `${left}px`
  }

  //----------------------------------------------------------------------------------------------
  // setTop
  //----------------------------------------------------------------------------------------------
  const setTop = (element: any, top: number): void => {
    geometry.y = top
    // eslint-disable-next-line no-param-reassign
    element.style.top = `${top}px`
  }

  //----------------------------------------------------------------------------------------------
  // setWidth
  //----------------------------------------------------------------------------------------------
  const setWidth = (element: any, width: number): void => {
    geometry.width = width
    // eslint-disable-next-line no-param-reassign
    element.style.width = `${width}px`
  }

  //----------------------------------------------------------------------------------------------
  // setZ
  //----------------------------------------------------------------------------------------------
  const setZ = (element: any, z: number): void => {
    geometry.z = z
    // eslint-disable-next-line no-param-reassign
    element.style.zIndex = `${z}`
  }


  //----------------------------------------------------------------------------------------------
  // render
  //----------------------------------------------------------------------------------------------
  const { children } = props

  const renderBodyCover = () : React.JSX.Element | null => {
    if (props.isIframe && props.isIframe ) {
      return (<BodyCover $geometry={geometry} className={'BodyCover'}/>)
    } else {
      return null
    }
  }

  return (
    <Wrapper $geometry={geometry} id={wrapperId}>
      <Content>
        <div
          style={StyleNW}
          role="button"
          onPointerDown={(e) => resizePointerDown(e, Resizer.NW)}
        />
        <div
          style={StyleN}
          role="button"
          onPointerDown={(e) => resizePointerDown(e, Resizer.N)}
        />
        <div
          style={StyleNE}
          role="button"
          onPointerDown={(e) => resizePointerDown(e, Resizer.NE)}
        />
        <div
          style={StyleW}
          role="button"
          onPointerDown={(e) => resizePointerDown(e, Resizer.W)}
        />
        <div
          style={StyleE}
          role="button"
          onPointerDown={(e) => resizePointerDown(e, Resizer.E)}
        />
        <div
          style={StyleSW}
          role="button"
          onPointerDown={(e) => resizePointerDown(e, Resizer.SW)}
        />
        <div
          style={StyleS}
          role="button"
          onPointerDown={(e) => resizePointerDown(e, Resizer.S)}
        />
        <div
          style={StyleSE}
          role="button"
          onPointerDown={(e) => resizePointerDown(e, Resizer.SE)}
        />

        <FrameHeader
          buttons={buttons}
          canvas={canvas}
          height={headerHeight}
          onMouseDown={dragPointerDown}
          title={title}
        />
        <FrameBody id={bodyId} onMouseDown={restack}>
          <>{children}</>
          { renderBodyCover() }
        </FrameBody>
      </Content>
    </Wrapper>
  )
}
