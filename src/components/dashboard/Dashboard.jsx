import { setConfiguration } from 'react-grid-system';
import { Container, Row, Col } from 'react-grid-system';
import Button from '../button/Button'
import Table from '../table/Table';
import { useState } from 'react';
import './Dashboard.css'
import axios from 'axios';


export default function Dashboard() {

  
  
  setConfiguration({ maxScreenClass: 'xl' });
  let usuarioNome = '';
  let array = [];
  if (localStorage.getItem("sipToken") !== null) {
    usuarioNome = localStorage.getItem("sipUser").substring(0, localStorage.getItem("sipUser").indexOf(" ") + 1)
  } else {
    window.location.href = "/"
  }

   const getSmartphones = async () =>  {
   await axios.get('http://localhost:3001/smartphone', {
      headers: {
        "Authorization": `bearer ${localStorage.getItem("sipToken")}`
      }
    }).then((response) => {
      array = response.data
    }).catch((e) => {
      alert(e)
    })
  }

  console.log('dsdsd',array)
  
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
            <h2>Bem-vindo(a) <strong>{usuarioNome}</strong></h2>
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
        <Col sm={12}>
          <Table
            headers={['ID Dispositivo', 'CNPJ', 'Nome do usuário']}
            data={getSmartphones()}
          ></Table>
        </Col>
      </Row>
    </Container>
  );
}