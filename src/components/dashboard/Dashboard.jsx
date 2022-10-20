import { setConfiguration } from 'react-grid-system';
import { Container, Row, Col } from 'react-grid-system';
import Button from '../button/Button'
import Table from '../table/Table';
import { useState, useEffect } from 'react';
import './Dashboard.css'
import axios from 'axios';
import React from 'react';


export default function Dashboard()  {

  const [smartphones, setSmartphones] = useState([])

  useEffect(() => {
    getSmartphones()
  }, [])

  function getSmartphones(){
    axios.get('http://localhost:3001/smartphone', {
      headers: {
        "Authorization": `bearer ${localStorage?.getItem("sipToken")}`
      }
    }).then(res => {
      setSmartphones(res.data);
    })
  }

  function deleteSmartphone(idDisp){
    axios.delete('http://localhost:3001/smartphone/' + idDisp, axiosConfig).then((response) => {
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
              <h2>Bem-vindo(a) <strong>{localStorage.getItem("sipUser").substring(0, localStorage.getItem("sipUser").indexOf(" ") + 1)}</strong></h2>
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
                  'idDisp',
                  'cnpj',
                  'usuario',
                  'status',
                  'codLoj',
                  'nomLoj',
                  'versao',
                  'autCgm',
                  'nLocal',
                  'nAndroid',
                  'dLocal',
                  'dAndroid',
                  'versaoEstavel',
                  'linkAtualizacao'
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

