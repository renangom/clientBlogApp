import React from 'react'
import './singles.css'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { Singlepost } from '../../components/Singlepost/Singlepost'

export const Single = () => {
  return (
    <div className='single'>
        <Singlepost />
        <Sidebar />
    </div>
  )
}
