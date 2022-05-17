import './login.css'
import Input from '../input/Input'
import { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';
import NotificationAlert from "../notificationAlert/NotificationAlert";


export default props => {

  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')

  async function login() {
    axios
      .post('http://localhost:3001/login', {
        email: usuario.target.value,
        password: password.target.value
      }).then((response) => {
        if(response.status === 200){
          localStorage.setItem("sipToken", response.data.token);
          alert(response.data.user.name + ", Bem-vindo!")
          
        }
      }).catch((e) => {
        alert(e.response.data.erro)
      })
  }

  return (
    <div style={{
      backgroundImage: `url("/background_login.png")`,
      display: "table",
      width: "100%",
      height: "100vh",
      backgroundSize: "cover",
    }}>
      <img
        src={require("/home/guilherme/Documents/SENAC/tcc/sip_web/src/components/login/cgm_logo.png")}
        style={{
          maxWidth: "400px",
          width: "100%",
          height: "auto"
        }}
      >
      </img>

      <div className="Card">
        <h2>Sistema Integrador de Pedidos (SIP)</h2>
        <Input
          type={"email"}
          placeholder={"Usuário"}
          whenChange={setUsuario}
        >
        </Input>
        <Input
          type={"password"}
          placeholder={"Senha"}
          whenChange={setPassword}
        >
        </Input>

        <button onClick={(e) => login()}>Acessar</button>

      </div>

    </div>
  )
}