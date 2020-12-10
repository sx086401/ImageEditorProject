import { makeStyles } from '@material-ui/core'
import React from 'react'
import { DisplayData } from '../model/displayData'
import ImageContainer from './ImageContainer'

const useStyle = makeStyles({
  list: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: 355,
    marginTop: 10,
    maxHeight: '100%',
  },
})

interface Props {
  imageList: string[]
  onChangeDisplayData: (newDisplayData: DisplayData) => void
}

export default function ImageList(props: Props) {
  const classes = useStyle()
  const { imageList, onChangeDisplayData } = props

  return (
    <div className={classes.list}>
      {imageList.map((image, index) =>
        <ImageContainer key={index} imageSrc={image} onChangeDisplayData={onChangeDisplayData}/>)
      }
    </div>
  )
}
