import React from 'react'
import './header.css'

export const Header = () => {
  return (
    <div className='header'>
        <div className="headerTitles">
          <span className='headerTitleSm'> Física & Tecnologia</span>
          <span className='headerTitleLg'>Blog </span>
        </div>
        <img src='https://images.pexels.com/photos/8850986/pexels-photo-8850986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' className='headerImage' alt='' />

    </div>
  )
}
