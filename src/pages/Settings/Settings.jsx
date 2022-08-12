import { useContext } from "react";
import { Sidebar } from "../../components/Sidebar/Sidebar";
import "./settings.css";
import {Context} from '../../context/Context'
import { useState } from "react";
import axios from "axios";

export default function Settings() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false); 
  const {user, dispatch} = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({type:"UPDATE_START"})

    const updatedUser = {
      id: user._id,
      name,
      email,
      password
    }

    if(file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePicture = filename;
      try{
        await axios.post('http://localhost:5000/api/upload', data)
        
      }catch(err){
      }
    }
    try{
      const res  = await axios.put(`http://localhost:5000/api/users/${user._id}`, updatedUser)
      setSuccess(true)
      dispatch({type:"UPDATE_SUCCESS", payload: res.data})
    }catch(err){
      dispatch({type:"UPDATE_FAILURE"})
    }
  }

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Atualize seus dados</span>
          <span className="settingsTitleDelete">Deletar Conta</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Foto de Perfil </label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : `http://localhost:5000/images/${user.profilePicture}`}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Nome</label>
          <input type="text" placeholder={user.name} name="name" onChange={(e) => setName(e.target.value)} />
          <label>Email</label>
          <input type="email" placeholder={user.email} name="email" onChange={(e) => setEmail(e.target.value)} />
          <label>Senha</label>
          <input type="password" placeholder="senha" name="password" onChange={(e) => setPassword(e.target.value)} />
          <button className="settingsSubmitButton" type="submit">
            Atualizar
          </button>
          {success && <span style={{color: "green"}}>Perfil alterado</span>}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}