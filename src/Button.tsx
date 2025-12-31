import React from 'react'

export interface Button {
  icon: React.JSX.Element
  onClick: () => void
  tip: string
}
