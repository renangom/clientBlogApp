import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import './singlepost.css'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../context/Context';

export const Singlepost = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({})
    const {user} = useContext(Context)
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [updateMode, setUpdateMode] = useState(false);

    //===================== PEGANDO POST
    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get('http://localhost:5000/api/posts/'+path)
            setPost(res.data)
            setTitle(res.data.title)
            setDesc(res.data.desc)
        }
        getPost()
    }, [path])

    // =================== DELETANDO POST
    const handleDelete = async () => {
       try{
            await axios.delete(`http://localhost:5000/api/posts/${path}`, {data:{name: user.name}})
            window.location.replace("/")
       }catch(err){
            console.log(err)
       }
    }

    // ==================== EDITANDO POST
    const handleUpdate = async () => {
        try{
            await axios.put(`http://localhost:5000/api/posts/${post._id}`, {
                name: user.name,
                title: title,
                desc: desc
            });
            window.location.reload();
            setUpdateMode(false);
        }catch(err){

        }
    }

  return (
    <div className='singlespost'>
        <div className="singlePostWrapper">
            {post.photo && <img src={`http://localhost:5000/images/${post.photo}`} className='singlePostImg' alt='' />}
            {
                updateMode ? <input onChange={(e) => setTitle(e.target.value)} autoFocus className='singlePostTitleInput' type="text" value={title}/> : (
                    <h1 className="singlePostTitle">
                        {title}
                        {post.name === user?.name && 
                            <div className="singlePostEdit">
                                <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={() => setUpdateMode(true)}></i>
                                <i className="singlePostIcon fa-solid fa-trash" onClick={handleDelete}></i>
                            </div>
                        }
                    </h1>
                )
            }
            <div className="singlePostInfo">
                <span className='singlePostAuthor'>Autor: <Link to={`/?user=${post.name}`}><b>{post.name}</b></Link></span>
                <span className='singlePostDate'>Data: <b>{new Date(post.createdAt).toString()}</b></span>
            </div>
            {updateMode ? <textarea onChange={(e) => setDesc(e.target.value)} className='singlePostDescInput' value={desc} /> : (
                <p className="singlePostDesc">
                    {desc}
                </p>
            )}

            {updateMode? <button className='singlePostButton' onClick={handleUpdate}> Enviar </button> : null}
            
        </div>
    </div>
  )
}
