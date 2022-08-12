import React from 'react'
import './post.css'
import {Link} from 'react-router-dom'

export const Post = ({img, title, desc, post}) => {
  return (
    <div className='post'>
       {post.photo && <img className='postImage' src={`http://localhost:5000/images/${post.photo}`} alt='' />}
        <div className="postInfo">
          <div className="postCategories">
            {post.categories.map((cat) => {
              return(
                <span className="postCat" key={cat.name}>
                  {cat.name}
                </span>
              )
            })}
          </div>
          <Link to={`post/${post._id}`}>
            <span className="postTitle">{title}</span>
          </Link> 
          <hr />
          <span className="postDate">1 hora atrás</span>
        </div>
        <p className='postDesc'>{desc}</p>
    </div>
  )
}
