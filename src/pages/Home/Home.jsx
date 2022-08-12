import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Header } from '../../components/Header/Header'
import { Posts } from '../../components/Posts/Posts'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import './home.css'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

export const Home = () => {
  const [posts, setPosts] = useState([])
  const {search} = useLocation();


  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:5000/api/posts/"+search)
      setPosts(res.data)
    }
    fetchPosts()
  }, [search])
  return (
    <div>
        <Header />
        <div className='home'>
          <Posts posts={posts} />
          <Sidebar />
        </div>
    </div>
  )
}
