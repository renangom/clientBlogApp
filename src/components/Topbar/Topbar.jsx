import React from 'react'
import './topbar.css'
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { Context } from '../../context/Context';

export const Topbar = () => {
    const {user, dispatch} = useContext(Context)

    const handleLogout = () => {
        dispatch({type:"LOGOUT"})
        console.log("lalala")
    }
  return (
    <div className='top'>
        <div className="topLeft">
            <i className="topIcon fa-brands fa-square-twitter"></i>
            <i className="topIcon fa-brands fa-square-pinterest"></i>
            <i className="topIcon fa-brands fa-square-facebook"></i>
            <i className="topIcon fa-brands fa-square-instagram"></i>
        </div>
        <div className="topCenter">
            <ul className="topList">
                <li className="topListItem">
                    <Link className="link" to="/">
                        Home
                    </Link>
                </li>
                <li className="topListItem">Sobre</li>
                <li className="topListItem">Contato</li>
                <li className="topListItem">
                    <Link className="link" to="/write">
                        Escrever
                    </Link>
                </li>
                <li onClick={handleLogout} className="topListItem">{user && "Sair"}</li>
            </ul>
        </div>
        <div className="topRight">
            {user ? (
            <Link className="link" to="/settings">
                <img
                className="topImg"
                src={`http://localhost:5000/images/${user.profilePicture}`}
                alt=""
                />
            </Link>
            ) : (
            <ul className="topList">
                <li className="topListItem">
                <Link className="link" to="/login">
                    Entrar
                </Link>
                </li>
                <li className="topListItem">
                <Link className="link" to="/register">
                    Registrar
                </Link>
                </li>
            </ul>
            )}
            <i className="topSearchIcon fas fa-search"></i>
        </div>
    </div>
  )
}
