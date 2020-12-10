import { makeStyles } from '@material-ui/core'
import { DropzoneArea } from 'material-ui-dropzone'
import React, { useCallback, useState } from 'react'
import { DisplayData } from '../model/displayData'
import ImageList from './ImageList'

const useStyle = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  uploadBoard: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'flex-start',
    height: 792,
    width: 433,
    backgroundColor: 'rgb(247, 248, 250)',
    border: '1px solid gray',
    '& .header': {
      display: 'flex',
      height: 56,
      width: 433,
      backgroundColor: 'rgb(238, 239, 244)',
      alignItems: 'center',
      '& .dot': {
        height: 24,
        width: 24,
        backgroundColor: 'rgb(213, 218, 224)',
        marginLeft: 20,
        borderRadius: '100%'
      },
    },
  },
  uploader: {
    width: 355,
  },
  dataBoard: {
    display: 'flex',
    height: 703,
    width: 548,
    backgroundColor: 'rgb(43, 57, 72)',
    color: 'white',
    marginLeft: 135,
  }
})

export default function Board() {
  const classes = useStyle()
  const [images, setImages] = useState<any[]>([])
  const [displayData, setDisplayData] = useState<DisplayData[]>([])

  const onUpload = useCallback((uploadImages: Blob[]) => {
    if (uploadImages.length > 0) {
      const reader = new FileReader()
      reader.readAsDataURL(uploadImages[uploadImages.length - 1])
      reader.onloadend = function (e) {
        setImages([...images, reader.result])
      }
    }
  }, [images, setImages]
  )

  const onChangeDisplayData = useCallback((newDisplayData: DisplayData) => {
    displayData.push(newDisplayData)
    setDisplayData([...displayData])
  }, [displayData])

  return (
    <div className={classes.root}>
      <section className={classes.uploadBoard}>
        <div className={"header"}>
          <div className={"dot"}/>
        </div>
        <div className={classes.uploader}>
          <DropzoneArea
            onChange={onUpload}
            dropzoneText='Upload image'
            showPreviews={false}
            showPreviewsInDropzone={false}
            previewText=''
            filesLimit={4}
            showAlerts={false}
          />
        </div>
        <div>
          <ImageList imageList={images} onChangeDisplayData={onChangeDisplayData}/>
        </div>
      </section>
      <section className={classes.dataBoard}>{JSON.stringify(displayData)}</section>
    </div>
  )
}
