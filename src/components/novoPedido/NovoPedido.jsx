import { setConfiguration } from 'react-grid-system';
import { Container, Row, Col } from 'react-grid-system';
import Button from '../button/Button'
import Table from '../table/Table';
import InfoModal from '../modal/Modal';
import ModalInsertProduct from '../modalInsertProduct/ModalInsertProduct';
import './NovoPedido.css'
import axios from 'axios';
import Input from '../input/Input'
import React from 'react';



export default class NovoPedido extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pesquisaCliente: "",
      pesquisaModalidade: "",
      pesquisaCliente: "",
      pedidoCodCli: 0,
      pedidoCodMod: 0,
      pedidoProdutos: [],
      clientes: [],
      modalidades: [],
      produtos: [],
      dataTypeModal: "",
      keysModal: [],
      isOpenModal: false,
      isOpenModalInsertProduct: false,
      dataModal: [],
      produtoASerInserido: null,
      tittleModal: ""
    };
  }

  keysCliente = 
    [
      'codCli',
      'nomCli',
      'fonCli',
      'email'
    ]
  keysProduto = 
    [
      'codPro',
      'desPro',
      'uniPro',
      'codBar'
    ]
  


  setPesquisaCliente = (nome) => {
    this.setState({
      pesquisaCliente: nome.toUpperCase()
    })
  }

  setPesquisaProduto = (nome) => {
    this.setState({
      pesquisaProduto: nome.toUpperCase()
    })
  }

  setPesquisaModalidade = (nome) => {
    this.setState({
      pesquisaModalidade: nome
    })
    alert(this.state.pesquisaModalidade)
  }

  
  fechaModalProduct = () =>{
    this.setState({
      isOpenModalInsertProduct: false
    })
  }

  selectedData = (data) => {
    switch(this.state.dataTypeModal){
      case "client":
        break;
      case "product":
        const codPro = data.codPro;
        this.getProdutos(codPro)
        this.setState({
          isOpenModal:false,
          isOpenModalInsertProduct:true
        })
        break;
        
    }
  }

  getClientes = (codCli) => {
    if(codCli == null)
      codCli = Number(this.state.pesquisaCliente)
    if (!isNaN(codCli)) {
      axios.get(`http://localhost:3001/cliente/${localStorage.getItem("sipCnpj")}/code/${codCli}`, {
        headers: {
          "Authorization": `bearer ${localStorage.getItem("sipToken")}`
        }
      }).then(res => {
        console.log(res.data)
        this.setState({
          codCli: res.data.codCli,
          pesquisaCliente: res.data.nomCli
        });
        
      })
    } else {
      axios.get(`http://localhost:3001/cliente/${localStorage.getItem("sipCnpj")}/name/${this.state.pesquisaCliente}`, {
        headers: {
          "Authorization": `bearer ${localStorage.getItem("sipToken")}`
        }
      }).then(res => {
        this.setState({
          dataModal: res.data,
          tittleModal: `Pesquisa Cliente por: ${this.state.pesquisaCliente}`, 
          keysModal: this.keysCliente,
          dataTypeModal: "client",
          isOpenModal: true
        });
      })
    }
    this.setState({
      isOpenModal: false
    })
  }

  getProdutos = (codPro) => {
    if(codPro == null)
      codPro = Number(this.state.pesquisaProduto)
    if (!isNaN(codPro)) {
      axios.get(`http://localhost:3001/produto/${localStorage.getItem("sipCnpj")}/code/${codPro}`, {
        headers: {
          "Authorization": `bearer ${localStorage.getItem("sipToken")}`
        }
      }).then(res => {
        console.log("ODIO: ", res.data)

        this.setState({
          produtoASerInserido: res.data,
          codPro: res.data.codPro,
          pesquisaProduto: res.data.nomPro
        });
        
      })
    } else {
      axios.get(`http://localhost:3001/produto/${localStorage.getItem("sipCnpj")}/name/${this.state.pesquisaProduto}`, {
        headers: {
          "Authorization": `bearer ${localStorage.getItem("sipToken")}`
        }
      }).then(res => {
        this.setState({
          dataModal: res.data,
          tittleModal: `Pesquisa produto por: ${this.state.pesquisaProduto}`, 
          keysModal: this.keysProduto,
          dataTypeModal: "product",
          isOpenModal: true
        });
      })
    }
    this.setState({
      isOpenModal: false,
      isOpenModalInsertProduct: false
    })
  }

  render() {
    return (
      <div>
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
              <div className="cardNovoPedido">
                <h2>Bem-vindo(a) <strong>{localStorage.getItem("sipUser").substring(0, localStorage.getItem("sipUser").indexOf(" ") + 1)}</strong></h2>
                <div className="button-group">
                  <Button
                    label={"Sair"}>
                  </Button>
                  <Button
                    label={"Gravar"}
                    onClick={function (_) {
                      window.location.href = '/users'
                    }}>
                  </Button>
                  <Button
                    label={"Cancelar"}
                    onClick={function (_) {
                      window.location.href = '/charts'
                    }}>
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={2}>
              <strong className={"fieldName"}>Modalidade</strong>
              <Input
                id={"modalidade"}
                name={"modalidade"}
                type={"number"}
                whenChange={null}
              >
              </Input>
            </Col>
            <Col sm={2}>
              <Button
                label={"Inserir"}
                onClick={() => {
                  this.getClientes()
                }}>
              </Button>
            </Col>
            <Col sm={6}>
              <strong className={"fieldName"}>Cliente</strong>
              <Input
                id={"cliente"}
                name={"cliente"}
                type={"text"}
                placeholder={"Insira um código ou nome para pesquisa"}
                whenChange={this.setPesquisaCliente}
              >
              </Input>
            </Col>
            <Col sm={2}>
              <Button
                label={"Inserir"}
                onClick={() => {
                  this.getClientes()
                }}>
              </Button>
            </Col>
            </Row>
            <Row>
            <Col sm={8}>
              <strong className={"fieldName"}>Produtos</strong>
              <Input
                id={"produto"}
                name={"produto"}
                type={"text"}
                placeholder={"Insira um código ou nome para pesquisa"}
              whenChange={this.setPesquisaProduto}
              >
              </Input>
            </Col>

            <Col sm={2}>
              <Button
                label={"Pesquisar"}
                onClick={() => {
                  this.getProdutos()
                }}>
              </Button>
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
        <InfoModal
          title={this.state.tittleModal}
          dataTypeModal={this.state.dataTypeModal}
          isOpenModal={this.state.isOpenModal}
          keys={this.state.keysModal}
          data={this.state.dataModal}
          selectedData={this.selectedData}
        />
        <ModalInsertProduct
          title={"Inserir Produto"}
          produto={this.state.produtoASerInserido}
          fechaModalProduct={this.fechaModalProduct}
          isOpenModal={this.state.isOpenModalInsertProduct}
        />

        
      </div>
    );
  }
}
