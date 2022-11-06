import { setConfiguration } from 'react-grid-system';
import { Container, Row, Col } from 'react-grid-system';
import './Chart.css'
import axios from 'axios';
import React from 'react';
import Button from '../button/Button'
import { Chart } from "react-google-charts";
import { useState, useEffect } from 'react';

export default function User() {

 const url =  require('../api').default;

  const [data, setData] = useState([])

  function getData() {
    axios.get(`${url}/smartphone`, {
      headers: {
        "Authorization": `bearer ${localStorage?.getItem("sipToken")}`
      }
    }).then(res => {
      let array = [["Data", "Envio do ERP", "Envio do Smartphone"]]
      filter('SMARTPHONE', res?.data)?.map((e, index) => {
        if (index < 11)
          array.push([e?.usuario, e?.nLocal, e?.nAndroid])
      })

      setData(array)
    })
  }

  function filter(direction, array) {
    switch (direction) {
      case 'SMARTPHONE':
        return array?.sort(function (a, b) {
          if (a.nAndoid < b.nAndroid) {
            return 1;
          }
          if (a.nAndroid > b.nAndroid) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
      case 'ERP':
        return array?.sort(function (a, b) {
          if (a.nLocal < b.nLocal) {
            return 1;
          }
          if (a.nLocal > b.nLocal) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const options = {
    title: "Dados de uso da API",
    chartArea: { width: "50%" },
    hAxis: {
      title: "Número de envios",
      minValue: 0,
    },
    vAxis: {
      title: "Usuários",
    },
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
                label={"Sair"}>
              </Button>
              <Button
                label={"Dashboards"}
                onClick={function (_) {
                  window.location.href = '/dashboard'
                }}>
              </Button>
              <Button
                label={"Usuários"}
                onClick={function (_) {
                  window.location.href = '/users'
                }}>
              </Button>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={5}>
          <h2>Dados dos Smartphones</h2>
          <Chart
            chartType="BarChart"
            width="120%"
            height="500px"
            data={data}
            options={options}
          />
        </Col>
      </Row>
    </Container>
  );

}
