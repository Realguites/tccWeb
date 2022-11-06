import './login.css'
import Input from '../input/Input'
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-notifications/lib/notifications.css';
import { isExpired, decodeToken } from "react-jwt";


export default props => {

  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const url =  require('../api');
  useEffect(() => {
    const isMyTokenExpired = isExpired(localStorage.getItem("sipToken"));
    if(!isMyTokenExpired){
      const userData = decodeToken(localStorage.getItem("sipToken"));
      redirectUser(userData.user.level)
    }

  }, [])
  const login = () => {
    axios.post(url.default + '/login', {
      email: usuario,
      password: password
    }).then((response) => {
      if (response.status === 200) {
        localStorage.setItem("sipToken", response.data.token);
        //localStorage.setItem("sipUser", response.data.user.name);
        //localStorage.setItem("sipCnpj", response.data.user.cnpj);
        alert(response.data.user.name + ", Bem-vindo!")
        const userData = decodeToken(response.data.token);
        redirectUser(userData.user.level)
      }
    }).catch((e) => {
      alert(e.response.data.erro)
    })
  }

  const redirectUser = (level) =>{
    if(
      level === 'A' ||
      level === 'B' ||
      level === 'C' ||
      level === 'D'
    )
      window.location.href = "/dashboard";
    else
      window.location.href = "/pedidos";
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