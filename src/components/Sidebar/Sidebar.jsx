import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import './sidebar.css'
import axios from 'axios'
import { Link } from 'react-router-dom';

export const Sidebar = () => {
    const [cat, setCats] = useState([]);

    useEffect(() => {
        const getCat = async () => {
            const res = await axios.get('http://localhost:5000/api/categories/')
            setCats(res.data)
        }
        getCat()
    }, [])
  return (
    <div className='sidebar'>
        <div className="sidebarItem">
            <span className="sidebarTitle">
                Sobre Mim
            </span>
            <img className='' src='https://images.pexels.com/photos/2882509/pexels-photo-2882509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' alt='' />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum quidem consectetur labore adipisci minima aperiam quam. Nisi impedit corporis quae optio, omnis fugiat, quis asperiores unde nulla consequuntur repudiandae dicta!</p>
        </div>
        <div className='sidebarItem'>
            <span className="sidebarItem">
                Categorias
            </span>
            <ul className="sidebarList">
                {cat.map((item) => {
                    return(
                        <Link to={`/?cat=${item.name}`}>
                            <li className="sidebarListItem" key={item._id}>
                                {item.name}
                            </li>
                        </Link>
                    )
                })}
            </ul>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">
                Nos siga
            </span>
            <div className="sidebarSocial">
                <i className="sidebarIcon fa-brands fa-square-twitter"></i>
                <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
                <i className="sidebarIcon fa-brands fa-square-facebook"></i>
                <i className="sidebarIcon fa-brands fa-square-instagram"></i>
            </div>
        </div>
    </div>
  )
}
