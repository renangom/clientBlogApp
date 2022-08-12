import { useContext } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Context } from "../../context/Context";
import "./login.css";
import axios from 'axios'

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(false);

  const {dispatch, isFetching} = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false)
    dispatch({type:"LOGIN_START"});
    try{  
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        name: userRef.current.value,
        password: passwordRef.current.value,
      })
      dispatch({type:"LOGIN_SUCCESS", payload:res.data})
    }catch(error){
      dispatch({type:"LOGIN_FAILURE"})
      setError(true)
    }
  }

  console.log(isFetching)
  return (
    <div className="login">
      <span className="loginTitle">Página de Login</span>
      <form className="loginForm" onSubmit={(e) => handleSubmit(e)}>
        <label>Nome de Usuário</label>
        <input ref={userRef} className="loginInput" type="text" placeholder="Digite seu email..." />
        <label>Senha</label>
        <input ref={passwordRef} className="loginInput" type="password" placeholder="Digite sua senha..." />
        <button className="loginButton" disabled={isFetching}>Entrar</button>
      </form>
        <button className="loginRegisterButton" type="submit">Registrar</button>
        {error && <span style={{color: "tomato"}}>Dados Inválidos</span>}
    </div>
  );
}