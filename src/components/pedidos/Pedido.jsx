import { setConfiguration } from 'react-grid-system';
import { Container, Row, Col } from 'react-grid-system';
import Button from '../button/Button'
import Table from '../table/Table';
import { useState } from 'react';
import { isExpired, decodeToken } from "react-jwt";
import './Pedido.css'
import axios from 'axios';
import React from 'react';


export default class Pedido extends React.Component {

  state = {
    userData: decodeToken(localStorage.getItem("sipToken"))?.user,
    pedidos: []
    //usuarioNome: localStorage.getItem("sipUser").substring(0, localStorage.getItem("sipUser").indexOf(" ") + 1)
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/pedido/${this.state.userData?.cnpj}`, {
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
              <h2>Bem-vindo(a) <strong>{this.state.userData?.name.substring(0, this.state.userData?.name.indexOf(" ") + 1)}</strong></h2>
              <div className="button-group">
                <Button
                  label={"Sair"}>
                </Button>
                <Button
                  label={"Usuários"}
                  onClick={function (_) {
                    window.location.href = '/users'
                  }}>
                </Button>
                <Button
                  label={"Gráficos"}
                  onClick={function (_) {
                    window.location.href = '/charts'
                  }}>
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <h2>Pedidos efetuados</h2>
          </Col>
        </Row>
        <Row>

          <Col sm={12}>
            <div className="table">
              <Table
                keys={[
                  { id: 'id', label: 'Registro', type: 'numeric' },
                  { id: 'codLoj', label: 'Cód Loja', type: 'numeric' },
                  { id: 'codMod', label: 'Cód Modalidade', type: 'numeric' },
                  { id: 'codCli', label: 'Cód Cliente', type: 'numeric' },
                  { id: 'nomCli', label: 'Nome Cliente', type: 'string' },
                  { id: 'perDes', label: 'Percentual Desconto', type: 'perCent' },
                  { id: 'vlrReg', label: 'Valor total', type: 'money' },
                  { id: 'data', label: 'Data', type: 'date' }
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
