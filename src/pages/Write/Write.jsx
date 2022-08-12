import React from 'react'
import { useState } from 'react'
import './write.css'
import axios from 'axios'
import { useContext } from 'react'
import { Context } from "../../context/Context";

export const Write = () => {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [file, setFile] = useState(null)
    const {user} = useContext(Context)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            title,
            desc,
            name: user.name,
        };
        if(file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append('name',filename)
            data.append('file',file)

            newPost.photo = filename

            try{
                await axios.post('http://localhost:5000/api/upload', data)
            }catch(err){

            }
        }
        try{
             const res = await axios.post('http://localhost:5000/api/posts/', newPost)
             window.location.replace("/post/"+res.data._id)
        }catch(err){

        }
        
    }
  return (  
    <div className='write'>
        {file && <img className='writeImg' src={URL.createObjectURL(file)} alt='' />}
        <form className='writeForm' onSubmit={handleSubmit}>
            <div className="writeFormGroup">
                <label htmlFor="fileInput">
                    <i className="writeIcon fa-solid fa-plus"></i>
                </label>
                <input type="file" id='fileInput' style={{display:"none"}} onChange={e => setFile(e.target.files[0])} />
                <input onChange={(e) => setTitle(e.target.value)} type='text' placeholder='Título...' className='writeInput' autoFocus={true} />
            </div>
            <div className="writeFormGroup">
                <textarea onChange={(e) => setDesc(e.target.value)} placeholder='Conte nos um pouco da sua história...' className='writeInput writeText' ></textarea>
                <button className="writeSubmit" type='submit'>Publicar</button>
            </div>
        </form>
    </div>
  )
}
