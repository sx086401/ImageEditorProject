import { makeStyles } from '@material-ui/core'
import React from 'react'

const useStyle = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  uploadBoard: {
    display: 'flex',
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
      }
    }
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
  return (
    <div className={classes.root}>
      <section className={classes.uploadBoard}>
        <div className={"header"}>
          <div className={"dot"}/>
        </div>
      </section>
      <section className={classes.dataBoard}></section>
    </div>
  )
}
