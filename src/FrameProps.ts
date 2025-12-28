import { Canvas } from './Canvas'
import { Geometry } from './Geometry'

export interface FrameProps {
  canvas: Canvas
  geometry: Geometry
  id: number
  key: number
  message: any
  state: any
}
