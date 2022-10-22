
/* eslint-disable  */
import { CircularProgress } from '@material-ui/core'
import React from 'react'

function Loader() {
  return (
    <div className='Loader'>
       <div className='overlay'>
       <CircularProgress />
       </div>
    </div>
  )
}

export default Loader