import { setConfiguration } from 'react-grid-system';
import { Container, Row, Col } from 'react-grid-system';
import Button from '../button/Button'
import Table from '../table/Table';
import { useState, useEffect } from 'react';
import { isExpired, decodeToken } from "react-jwt";
import './Dashboard.css'
import axios from 'axios';
import React from 'react';


export default function Dashboard()  {

  const [smartphones, setSmartphones] = useState([])
  const user = decodeToken(localStorage.getItem("sipToken"))?.user;

  const url =  require('../api').default;

  useEffect(() => {
    getSmartphones()
  }, [])

  function getSmartphones(){
    axios.get(`${url}/smartphone`, {
      headers: {
        "Authorization": `bearer ${localStorage?.getItem("sipToken")}`
      }
    }).then(res => {
      setSmartphones(res.data);
    })
  }

  function deleteSmartphone(idDisp){
    axios.delete(`${url}/smartphone` + idDisp, axiosConfig).then((response) => {
        if(response.status === 204){
          alert(response.data)
          setSmartphones(null)
        }
      }).catch((e) => {
        alert(e?.message)
      }).then(getSmartphones())
  }

  function getDataFromTable(condition, data){
      if(condition === 'delete'){
        if(window.confirm(`Tem certeza que deseja excluir ${data?.usuario}? Isso é irreversível!`)){
          //deleteUser(data?.id)
          deleteSmartphone(data?.idDisp)
        }
      }
    //}
    
  }

  const axiosConfig = {
    headers: {
      'Authorization': `bearer ${localStorage.getItem("sipToken")}`
    }
  };


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
              <h2>Bem-vindo(a) <strong>{user?.name?.substring(0, user?.name?.indexOf(" ") + 1)}</strong></h2>
              <div className="button-group">
                <Button
                  label={"Sair"}
                  onClick={function(_){
                    localStorage.setItem("sipToken", null)
                    window.location.href= '/'
                  }}
                  >
                </Button>
                <Button
                  label={"Usuários"}
                  onClick={function(_){
                    window.location.href= '/users'
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
          <Col sm={12}>
            <div className="table">
              <Table
                keys={[
                  {id:'idDisp',label:'Id do Dispositivo', type:'string'},
                  {id:'cnpj',label:'CNPJ', type:'string'},
                  {id:'usuario',label:'Usuário', type:'string'},
                  {id:'status',label:'Status', type:'string'},
                  {id:'codLoj',label:'Cód. loja', type:'number'},
                  {id:'nomLoj',label:'Nome loja', type:'string'},
                  {id:'versao',label:'Versão', type:'string'},
                  {id:'autCgm',label:'Autorização CGM', type:'string'},
                  {id:'nLocal',label:'Número de envios local', type:'number'},
                  {id:'nAndroid',label:'Número de envios android', type:'number'},
                  {id:'dLocal',label:'Data último envio local', type:'date'},
                  {id:'dAndroid',label:'Data último envio android', type:'date'},
                  {id:'versaoEstavel',label:'Versão Estável', type:'string'},
                  {id:'linkAtualizacao',label:'Link de atualização', type:'string'}
                ]}
                data={smartphones}
                returnLineData={getDataFromTable}
              ></Table>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

