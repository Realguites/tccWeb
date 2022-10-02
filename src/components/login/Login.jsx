import './login.css'
import Input from '../input/Input'
import { useState } from 'react';
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
        email: usuario,
        password: password
      }).then((response) => {
        if(response.status === 200){
          localStorage.setItem("sipToken", response.data.token);
          localStorage.setItem("sipUser", response.data.user.name);
          localStorage.setItem("sipCnpj", response.data.user.cnpj);
          alert(response.data.user.name + ", Bem-vindo!")
          window.location.href = "/dashboard";
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
        src={require("../images/cgm_logo.png")}
        style={{
          paddingTop: "20px",
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

        <button onClick={() => login()}>Acessar</button>

      </div>

    </div>
  )
}