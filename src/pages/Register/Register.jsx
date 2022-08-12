import { useState } from "react"
import "./register.css"
import axios from 'axios'

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false)
    try{
      const res =  await axios.post('http://localhost:5000/api/auth/register/', {
        name, email, password
      })

      res.data && window.location.replace("/login")
    }catch(err){
      setError(true)
    }
  }
    return (
        <div className="register">
      <span className="registerTitle">Página de Resgistro</span>
      <form className="registerForm" onSubmit={(e) => handleSubmit(e)}>
        <label>Nome de Usuário</label>
        <input onChange={(e) => setName(e.target.value)} className="registerInput" type="text" placeholder="Digite o nome de usuário..." />
        <label>Email</label>
        <input onChange={(e) => setEmail(e.target.value)} className="registerInput" type="text" placeholder="Digite seu email..." />
        <label>Senha</label>
        <input onChange={(e) => setPassword(e.target.value)} className="registerInput" type="password" placeholder="Digite sua senha..." />
        <button className="registerButton" type="submit">Registrar</button>
      </form>
        <button className="registerLoginButton">Logar</button>
        {error && <span style={{color:'tomato'}}>Algo está errado</span>}
    </div>
    )
}