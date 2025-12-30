import autoBind from 'auto-bind'
import React from 'react'
import { createRoot } from 'react-dom/client';
import type { FrameProps } from './FrameProps'
import type { Geometry } from './Geometry'

type FrameConfig = {
  component: (frameProps: FrameProps) => React.JSX.Element
  props: FrameProps
}

//-----------------------------------------------------------------------------------------------
// Canvas
//-----------------------------------------------------------------------------------------------
export class Canvas {
  canvasContext: any
  divRef: any
  frameConfigs: FrameConfig[] = []
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
  // addComponent
  //-----------------------------------------------------------------------------------------------
  addComponent(component: (frameProps: FrameProps) => React.JSX.Element, message: any ) {
    const geometry: Geometry = {
      height: 200,
      width: 300,
      x: this.lastX,
      y: this.lastY,
      z: this.lastZ,
    }

    this.lastX += 50
    if (this.lastX > 300) {
      this.lastX = 50
    }

    this.lastY += 50
    if (this.lastY > 300) {
      this.lastY = 50
    }

    this.lastZ += 1

    const frameProps: FrameProps = {
      canvas: this,
      geometry,
      id: this.getNextKey(),
      key: this.getNextKey(),
      message: message,
      state: {},
    }

    const frameConfig: FrameConfig = {
      component,
      props: frameProps,
    }

    this.frameConfigs.push(frameConfig)
    this.render()
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
    this.frameConfigs = this.frameConfigs.filter((f) => f.props.id !== id)
    this.render()
  }

  //-----------------------------------------------------------------------------------------------
  // render
  //-----------------------------------------------------------------------------------------------
  render(): void {
    const elements: any[] = []

    for (let i = 0; i < this.frameConfigs.length; i += 1) {
      const frameConfig = this.frameConfigs[i]
      const element = React.createElement(React.Fragment, { key: i }, React.createElement(frameConfig.component, frameConfig.props))
      elements.push(element)
    }

    this.root.render(elements)
  }
}
