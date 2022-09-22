import { setConfiguration } from 'react-grid-system';
import { Container, Row, Col } from 'react-grid-system';
import Button from '../button/Button'
import Table from '../table/Table';
import { useState } from 'react';
import './Pedido.css'
import axios from 'axios';
import React from 'react';


export default class Pedido extends React.Component {

  state = {
    pedidos: []
    //usuarioNome: localStorage.getItem("sipUser").substring(0, localStorage.getItem("sipUser").indexOf(" ") + 1)
  }

  componentDidMount() {
    axios.get('http://localhost:3001/pedido', {
      headers: {
        "Authorization": `bearer ${localStorage.getItem("sipToken")}`
      }
    }).then(res => {
      const pedidos = res.data;
      this.setState({ pedidos });
    })
  }

  render() {
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
            <div className="cardPedido">
              <h2>Bem-vindo(a) <strong>{localStorage.getItem("sipUser").substring(0, localStorage.getItem("sipUser").indexOf(" ") + 1)}</strong></h2>
              <div className="button-group">
                <Button
                  label={"Sair"}>
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
                data={this.state.pedidos}
              ></Table>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
