import { makeStyles } from '@material-ui/core'
import React, { useCallback, useRef, useState } from 'react'
import { DisplayData } from '../model/DisplayData'
import { Position } from '../model/Position'
import { SelectedArea } from '../model/SelectedArea'
import SelectedAreaList from './SelectedAreaList'

const useStyle = makeStyles({
  container: {
    position: 'relative',
    height: 200,
    width: 170,
    marginTop: 5,
    '& .image': {
      maxHeight: '100%',
      maxWidth: '100%'
    }
  }
})

interface Props {
  imageSrc: string
  onCreateDisplayData: (newDisplayData: DisplayData) => void
}

const onMouseMove = () => {
  // Draw the select area when dragging
}

export default function ImageContainer(props: Props) {
  const { imageSrc, onCreateDisplayData } = props
  const classes = useStyle()
  const containerRef = useRef<HTMLInputElement>(null)

  const [newPosition, setNewPosition] = useState<Position>({x: 0, y: 0})
  const [selectedAreas, setSelectedAreas] = useState<SelectedArea[]>([])

  const onMouseDown = useCallback(e => {
    document.addEventListener('mousemove', onMouseMove)
    setNewPosition({x: e.pageX, y: e.pageY})
  }, [setNewPosition])

  const onMouseUp = useCallback(e => {
    document.removeEventListener('mousemove', onMouseMove)
    const width = Math.abs(newPosition.x - e.pageX)
    const height = Math.abs(newPosition.y - e.pageY)
    const offsetLeft = containerRef.current ? containerRef.current.offsetLeft : 0
    const offsetTop = containerRef.current ? containerRef.current.offsetTop : 0
    const newSelectArea = {
      ...newPosition,
      id: selectedAreas.length + 1,
      width,
      height,
      relativeX: Math.min(newPosition.x, e.pageX) - offsetLeft,
      relativeY: Math.min(newPosition.y, e.pageY) - offsetTop,
    }
    selectedAreas.push(newSelectArea)
    setSelectedAreas([...selectedAreas])
    onCreateDisplayData({...newPosition, width, height})
  }, [newPosition, selectedAreas, setSelectedAreas, onCreateDisplayData])

  return (
    <div ref={containerRef} className={classes.container} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
      <img className={'image'} src={imageSrc} alt='img' onDragStart={e => e.preventDefault()}/>
      <SelectedAreaList selectedAreas={selectedAreas}/>
    </div>
  )
}
