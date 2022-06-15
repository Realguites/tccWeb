import { setConfiguration } from 'react-grid-system';
import { useForm } from "react-hook-form";
import { Container, Row, Col } from 'react-grid-system';
import Button from '../button/Button'
import Table from '../table/Table';
import { useState } from 'react';
import './User.css'
import Input from '../input/Input'
import axios from 'axios';
import React from 'react';



export default function User() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [level, setLevel] = useState('D')
  const [status, setStatus] = useState('')
  const [users, setUsers] = useState([])

  async function setUser(){
    if(password?.target?.value === repeatPassword?.target?.value){
      sendUser()
    }else{
      alert('Senha e repetir senha são diferentes!')
    }  

    
    //console.log('DATA ', nome, email, repeatPassword, password)
  }

  const axiosConfig = {
    headers: {
      'Authorization': `bearer ${localStorage.getItem("sipToken")}`
    }
  };

  const data = {
    name: name?.target?.value.trim(),
    email: email?.target?.value.trim(),
    password: password?.target?.value.trim(),
    level: level?.target?.value.trim(),
    status: status?.target?.value.trim()
   }

  function sendUser(){
    axios.post('http://localhost:3001/user', data, axiosConfig).then((response) => {
        if(response.status === 201){
          alert("Usuário cadastrado com sucesso!")
        }
      }).catch((e) => {
        alert(e?.message)
      })
  }

  function getusers(){
    axios.get('http://localhost:3001/user', {
      headers: {
        "Authorization": `bearer ${localStorage.getItem("sipToken")}`
      }
    }).then(res => {
      this.setUsers(res.data);
    })
  }

  return (

    <Container>
      <Row>
        <Col sm={4}>
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
        </Col>
        <Col sm={4}>

        </Col>

        <Col sm={4}>
          <div className="cardDashboard">
            <h2>Bem-vindo(a) <strong>{localStorage.getItem("sipUser").substring(0, localStorage.getItem("sipUser").indexOf(" ") + 1)}</strong></h2>
            <div className="button-group">
              <Button
                label={"Sair"}>
              </Button>
              <Button
                label={"Usuários"}>
              </Button>
              <Button
                label={"Gráficos"}>
              </Button>
            </div>
          </div>
        </Col>
      </Row>
        <Row>
          <div className="buttonOpcoes">
            <Button
              label={"Novo"}>
            </Button>
            <Button
              label={"Gravar"}
              onClick={setUser}>
            </Button>
            <Button
              label={"Cancelar"}>
            </Button>
          </div>
        </Row>
        <Row>
          <Col sm={7}>
            <Input
              id={"name"}
              name={"name"}
              type={"text"}
              placeholder={"Nome"}
              whenChange={setName}
            >
            </Input>
          </Col>
          <Col sm={5}>
            <Input
              id={"email"}
              name={"email"}
              type={"email"}
              placeholder={"Email"}
              whenChange={setEmail}
            >
            </Input>
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <Input
              id={"password"}
              name={"password"}
              type={"password"}
              placeholder={"Senha"}
              whenChange={setPassword}
            >
            </Input>
          </Col>
          <Col sm={3}>
            <Input
              id={"repeatPassword"}
              name={"repeatPassword"}
              type={"password"}
              placeholder={"Repetir senha"}
              whenChange={setRepeatPassword}
            >
            </Input>
          </Col>
          <Col sm={3}>
            <Input
              id={"level"}
              name={"level"}
              type={"text"}
              placeholder={"Nível"}
              whenChange={setLevel}
            >
            </Input>
          </Col>
          <Col sm={3}>
            <Input
              id={"status"}
              name={"status"}
              type={"text"}
              placeholder={"Status"}
              whenChange={setStatus}
            >
            </Input>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <div className="table">
            <Table
                keys={[
                  'name',
                  'email',
                  'level',
                  'status',
                  'registrationDate',
                  'updateDate'
                ]}
                data={this.state.smartphones}
              ></Table>
            </div>
          </Col>
        </Row>
    </Container>
  );
}
