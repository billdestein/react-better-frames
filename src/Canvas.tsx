import autoBind from 'auto-bind'
import React from 'react'
import { createRoot } from 'react-dom/client';
import type { Geometry } from './Geometry'

type Props = {
  geometry: Geometry
  id: number
  key: number
  message: any
  state: any
}

type FrameConfig = {
  component: React.FunctionComponent
  element: any
  props: Props
}

//-----------------------------------------------------------------------------------------------
// Canvas
//-----------------------------------------------------------------------------------------------
export class Canvas {
  canvasContext: any
  divRef: any
  frameConfigs: any[] = []
  id: string = ''
  lastX = 50
  lastY = 50
  lastZ = 10000
  nextKey = 0
  root: any

  //-----------------------------------------------------------------------------------------------
  // constructor
  //-----------------------------------------------------------------------------------------------
  constructor(divRef: any) {
    autoBind(this)

    // Make sure we only call createRoot once.
    if (!divRef.encore_root) {
      divRef.encore_root = createRoot(divRef)
    }
    this.root = divRef.encore_root

    // Get the id of the container div.  Assign one if there is none.
    if (divRef.id) {
      this.id = divRef.id
    } else {
      divRef.id = Math.random()
      this.id = divRef.id
    }

    this.divRef = divRef
    this.divRef.style.position = 'relative'
  }

  //-----------------------------------------------------------------------------------------------
  // addFrame
  //-----------------------------------------------------------------------------------------------
  addFrame(component: React.FunctionComponent, props: any ) {
    if (!props.x) {
      this.lastX += 50
      if (this.lastX > 300) {
        this.lastX = 50
      }
      props.x = this.lastX
    }

    if (!props.y) {
      this.lastY += 50
      if (this.lastY > 300) {
        this.lastY = 50
      }
      props.y = this.lastY
    }

    const z = this.lastZ
    this.lastZ += 1

    props.geometry = {
      height: props.height || 200,
      width: props.width || 300,
      x: props.x,
      y: props.y,
      z
    }

    props.id = this.getNextKey()
    props.key = this.getNextKey()
    props.state = {}

    const frameConfig: FrameConfig = {
      component,
      element: React.createElement(component, props),
      props,
    }

    this.frameConfigs.push(frameConfig)
    this.root.render(this.getElements())
  }

  //-----------------------------------------------------------------------------------------------
  // getElements
  //-----------------------------------------------------------------------------------------------
  getElements(): React.JSX.Element {
    return (
      <>
        { this.frameConfigs.map((f) => f.element) }
      </>
    )
  }

  //-----------------------------------------------------------------------------------------------
  // getId
  //-----------------------------------------------------------------------------------------------
  getId(): string {
    return this.id
  }

  //-----------------------------------------------------------------------------------------------
  // getNextKey
  //-----------------------------------------------------------------------------------------------
  getNextKey(): number {
    this.nextKey += 1
    return this.nextKey
  }

  //-----------------------------------------------------------------------------------------------
  // removeFrame
  //-----------------------------------------------------------------------------------------------
  removeFrame(id: number): void {
    this.frameConfigs = this.frameConfigs.filter((f) => f.props.id === id ? false : true)
    this.root.render(this.getElements())
  }

  //-----------------------------------------------------------------------------------------------
  // setCanvasContext
  //-----------------------------------------------------------------------------------------------
  setCanvasContext(canvasContext: any): void {
    this.canvasContext = canvasContext
  }
}
