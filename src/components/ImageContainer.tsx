import { makeStyles } from '@material-ui/core'
import React, { useCallback, useRef, useState } from 'react'
import { DisplayData } from '../model/DisplayData'
import { Position } from '../model/Position'
import { SelectedArea } from '../model/SelectedArea'
import SelectedAreaBlock from './SelectedAreaBlock'

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
  onDeleteDisplayData: (targetData: DisplayData) => void
}

export default function ImageContainer(props: Props) {
  const { imageSrc, onCreateDisplayData, onDeleteDisplayData } = props
  const classes = useStyle()
  const containerRef = useRef<HTMLInputElement>(null)
  const offsetLeft = containerRef.current ? containerRef.current.offsetLeft : 0
  const offsetTop = containerRef.current ? containerRef.current.offsetTop : 0

  const [newPosition, setNewPosition] = useState<Position>({x: 0, y: 0})
  const [selectedAreas, setSelectedAreas] = useState<SelectedArea[]>([])
  const [previewPosition, setPreviewPosition] = useState<Position>({x: 0, y: 0})
  const [isPreviewing, setIsPreviewing] = useState<boolean>(false)

  const calculatePreviewArea = useCallback(() => {
    return {
      ...newPosition,
      id: 0,
      width: Math.abs(newPosition.x - previewPosition.x),
      height: Math.abs(newPosition.y - previewPosition.y),
      relativeX: Math.min(newPosition.x, previewPosition.x) - offsetLeft,
      relativeY: Math.min(newPosition.y, previewPosition.y) - offsetTop,
    }
  }, [previewPosition, newPosition, offsetLeft, offsetTop])

  const onMouseMove = useCallback(e => {
    setPreviewPosition({x: e.pageX, y: e.pageY})
    }, [setPreviewPosition]
  )

  const onMouseDown = useCallback(e => {
    document.addEventListener('mousemove', onMouseMove)
    setIsPreviewing(true)
    setNewPosition({x: e.pageX, y: e.pageY})
  }, [onMouseMove, setNewPosition, setIsPreviewing])

  const onMouseUp = useCallback(e => {
    document.removeEventListener('mousemove', onMouseMove)
    setIsPreviewing(false)
    const width = Math.abs(newPosition.x - e.pageX)
    const height = Math.abs(newPosition.y - e.pageY)
    if (width >= 5 && height >= 5) {
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
    }
  }, [newPosition, selectedAreas, offsetLeft, offsetTop, onMouseMove, setSelectedAreas, onCreateDisplayData, setIsPreviewing])

  const onDelete = useCallback((targetArea: SelectedArea) => {
    document.removeEventListener('mousemove', onMouseMove)
    const index = selectedAreas.findIndex((area) => area.id === targetArea.id)
    selectedAreas.splice(index, 1)
    setSelectedAreas([...selectedAreas])
    onDeleteDisplayData({...targetArea})
    },
    [selectedAreas, onMouseMove, setSelectedAreas, onDeleteDisplayData],
  )

  return (
    <div ref={containerRef} className={classes.container} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
      <img className={'image'} src={imageSrc} alt='img' onDragStart={e => e.preventDefault()}/>
      {selectedAreas.map(selectArea =>
        <SelectedAreaBlock key={selectArea.id} selectedArea={selectArea} onDelete={onDelete}/>
      )}
      {/* {isPreviewing &&
        <SelectedAreaBlock selectedArea={calculatePreviewArea()} onDelete={onDelete}/>} */}
    </div>
  )
}
