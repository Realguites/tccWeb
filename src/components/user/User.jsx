import { setConfiguration } from 'react-grid-system';
import { useForm } from "react-hook-form";
import { Container, Row, Col } from 'react-grid-system';
import Button from '../button/Button'
import Table from '../table/Table';
import { useState, useEffect } from 'react';
import './User.css'
import { isExpired, decodeToken } from "react-jwt";
import Input from '../input/Input'
import axios from 'axios';
import React from 'react';



export default function User() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [level, setLevel] = useState('D')
  const [status, setStatus] = useState('')
  const [users, setUsers] = useState([])
  const [userToEdit, setUserToEdit] = useState(null)
  const url =  require('../api').default;
  const user = decodeToken(localStorage.getItem("sipToken"))?.user;

  async function setUser(){
    if(password?.target?.value === repeatPassword?.target?.value){
      if(userToEdit == null)
        sendUser()
      else
        updateUser(userToEdit?.id)
    }else{
      alert('Senha e repetir senha são diferentes!')
    }  

  }
  useEffect(() => {
    getusers()
  }, [])

  function getDataFromTable(condition, data){
    setUserToEdit(users?.data?.filter((e)=>{
      return e?.id === data?.id
    })[0])
    if(condition === 'update'){
      setName(userToEdit?.name)
      setEmail(userToEdit?.email)
      setLevel(userToEdit?.level)
      setStatus(userToEdit?.status)
      setCnpj(userToEdit?.cnpj)
    }else{
      if(condition === 'delete'){
        if(window.confirm('Tem certeza que deseja excluir o usuário ' + userToEdit?.name + '? Isso é irreversível!')){
          deleteUser(data?.id)
        }
      }
    }
    
  }

  const axiosConfig = {
    headers: {
      'Authorization': `bearer ${localStorage.getItem("sipToken")}`
    }
  };

  const data = {
    name: name?.trim(),
    email: email?.trim(),
    password: password?.trim(),
    level: level?.trim(),
    status: status?.trim(),
    cnpj: cnpj?.trim()
   }

  function sendUser(){
    axios.post(`${url}/user`, data, axiosConfig).then((response) => {
        if(response.status === 201){
          alert("Usuário cadastrado com sucesso!")
          setUserToEdit(null)
        }
      }).catch((e) => {
        alert(e?.message)
      }).then(getusers())
  }
  

  function updateUser(id){
    axios.put(`${url}/user/${id}`, data, axiosConfig).then((response) => {
        if(response.status === 204){
          alert("Usuário atualizado com sucesso!")
          setUserToEdit(null)
        }
      }).catch((e) => {
        alert(e?.message)
      }).then(getusers())
  }

  function deleteUser(id){
    axios.delete(`${url}/user/${id}`, axiosConfig).then((response) => {
        if(response.status === 204){
          alert("Usuário excluído com sucesso!")
          setUserToEdit(null)
        }
      }).catch((e) => {
        alert(e?.message)
      }).then(getusers())
  }

  function getusers(){
    axios.get(`${url}/user`, {
      headers: {
        "Authorization": `bearer ${localStorage?.getItem("sipToken")}`
      }
    }).then(res => {
      setUsers(res);
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
          <h2>Bem-vindo(a) <strong>{user?.name?.substring(0, user?.name?.indexOf(" ") + 1)}</strong></h2>            <div className="button-group">
              <Button
                label={"Sair"}>
              </Button>
              <Button
                label={"Dashboards"}
                onClick={function(_){
                  window.location.href= '/dashboard'
                }}>  
              </Button>
              <Button
                label={"Gráficos"}
                onClick={function(_){
                  window.location.href= '/charts'
                }}>
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
          <Col sm={5}>
            <Input
              id={"name"}
              name={"name"}
              type={"text"}
              placeholder={"Nome"}
              whenChange={setName}
              inputValue={name}
            >
            </Input>
          </Col>
          <Col sm={4}>
            <Input
              id={"email"}
              name={"email"}
              type={"email"}
              placeholder={"Email"}
              whenChange={setEmail}
              inputValue={email}
            >
            </Input>
          </Col>
          <Col sm={3}>
            <Input
              id={"cnpj"}
              name={"cnpj"}
              type={"text"}
              placeholder={"cnpj"}
              whenChange={setCnpj}
              inputValue={cnpj}
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
              inputValue={level}
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
              inputValue={status}
            >
            </Input>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <div className="table">
            <Table
                keys={[
                  {id:'id',label: 'Código', type:'number'},
                  {id:'name',label: 'Nome', type:'string'},
                  {id:'email',label: 'Email', type:'string'},
                  {id:'level',label: 'Nível', type:'string'},
                  {id:'status',label: 'Status', type:'string'},
                  {id:'cnpj',label: 'CNPJ', type:'string'},
                  {id:'registrationDate',label: 'Data de Criação', type:'date'},
                  {id:'updateDate', label: 'Data de atualização', type:'date'}
                ]}
                data={users?.data}
                returnLineData={getDataFromTable}
              ></Table>
            </div>
          </Col>
        </Row>
    </Container>
  );
}
