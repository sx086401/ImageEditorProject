import React from 'react'
import { SelectedArea } from '../model/SelectedArea'

interface Props {
  selectedAreas: SelectedArea[]
}

export default function SelectedAreaList(props: Props) {
  const { selectedAreas } = props

  return (
    <div>{selectedAreas.map(selectedArea => {
      return <div
        style={{
          position: 'absolute',
          left: selectedArea.relativeX,
          top: selectedArea.relativeY,
          height: selectedArea.height,
          width: selectedArea.width,
          border: '1px solid blue',
          backgroundColor: 'rgba(0,0,0,0)'
        }}
      />
    })}</div>
  )
}
