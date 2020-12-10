import React, { useCallback } from 'react'
import { SelectedArea } from '../model/SelectedArea'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import { IconButton, makeStyles } from '@material-ui/core'

const useStyle = makeStyles({
  deleteButton: {
    position: 'absolute',
    backgroundColor: 'white',
    width: 20,
    height: 20,
    top: -10,
    right: -10,
  }
})

interface Props {
  selectedArea: SelectedArea
  onDelete: (targetArea: SelectedArea) => void
}

export default function SelectedAreaBlock(props: Props) {
  const { selectedArea, onDelete } = props
  const classes = useStyle()

  const onDeleteClick = useCallback(() => {
    onDelete(selectedArea)
    },
    [selectedArea, onDelete],
  )

  return (
    <div
      style={{
        position: 'absolute',
        left: selectedArea.relativeX,
        top: selectedArea.relativeY,
        height: selectedArea.height,
        width: selectedArea.width,
        border: '1px solid blue',
        backgroundColor: 'rgba(0,0,0,0)'
      }}
    >
    <IconButton className={classes.deleteButton} onClick={onDeleteClick}>
      <DeleteOutlinedIcon/>
    </IconButton>
    </div>
  )
}
