import React from 'react'
import { Post } from '../Post/Post'
import './posts.css'

export const Posts = ({posts}) => {
  return (
    <div className='posts'>
      {posts.map((item) => {
        return(
          <Post key={item._id} img="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" post={item} title={item.title} desc={item.desc}/>
        )
      })} 
    </div>
  )
}
