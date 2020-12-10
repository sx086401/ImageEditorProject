import { makeStyles } from '@material-ui/core'
import React from 'react'

const useStyle = makeStyles({
  list: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: 355,
    marginTop: 10,
    maxHeight: '100%',
    '& .container': {
      height: 200,
      width: 170,
      marginTop: 5,
    },
    '& .image': {
      maxHeight: '100%',
      maxWidth: '100%'
    }
  },
})

interface Props {
  imageList: string[]
}

export default function ImageList(props: Props) {
  const classes = useStyle()
  const { imageList } = props
  return (
    <div className={classes.list}>
      {imageList.map((image, index) =>
        <div className={'container'} key={index}>
          <img
            className={'image'}
            src={image}
            alt='img'
            onDragStart={e => e.preventDefault()}
          />
        </div>
      )}
    </div>
  )
}
