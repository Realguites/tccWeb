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
      codCienteInserido: 0,
      nomeClienteInserido: null,
      tittleModal: "",
      codModalidade: 0,
      nomeModalidade: null
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

  keysModalidade =
    [
      'codMod',
      'ideMod',
      'desCad',
      'desIte'
    ]

  toDefaultMoneyMask = (value) => {
    return value.toLocaleString('pt-br', {
      currency: 'BRL',
      style: 'currency',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })

  }

  formatDataToTable = (values) => {
    let newArray = values.slice()
    newArray.map((e) => {
      e.vlrDes = this.toDefaultMoneyMask(e.vlrDes)
      e.vlrLiq = this.toDefaultMoneyMask(e.vlrLiq)
      e.vlrUni = this.toDefaultMoneyMask(e.vlrUni)
      e.totIte = this.toDefaultMoneyMask(e.totIte)
    })
    return newArray
  }

  setPesquisaCliente = (nome) => {
    this.setState({
      pesquisaCliente: nome
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
  }


  returnedModalProductData = (codPro, desPro, qtdPed) => {
    const codAte = 1; //necessita ser buscado na api os valore necessarios
    var md5 = require('md5');
    const vlrDes = (this.state.produtoASerInserido.quantidade.prcVen * (Number(desPro) / 100))
    const vlrLiq = this.state.produtoASerInserido.quantidade.prcVen - vlrDes
    let product = {
      'codPro': codPro,
      'seqIte': this.state.pedidoProdutos.length + 1,
      'qtdIte': Number(qtdPed),
      'vlrUni': Number(this.state.produtoASerInserido.quantidade.prcVen.toFixed(2)),
      'perDes': Number(desPro),
      'vlrDes': Number(vlrDes.toFixed(2)),
      'desPro': this.state.produtoASerInserido.desPro,
      'vlrLiq': Number(vlrLiq.toFixed(2)),
      'totIte': Number((Number(qtdPed) * vlrLiq).toFixed(2)),
      'idDisp': md5(codAte.toString().substring(0,15))
    }
    this.state.pedidoProdutos.push(product)
    this.setState({
      isOpenModal: false,
      isOpenModalInsertProduct: false
    })
  }



  fechaModalProduct = () => {
    this.setState({
      isOpenModalInsertProduct: false
    })
  }

  selectedData = (data) => {
    switch (this.state.dataTypeModal) {
      case "client":
        const codCli = data.codCli;
        this.getClientes(codCli)
        this.setState({
          isOpenModal: false,
        })
        break;
      case "product":
        const codPro = data.codPro;
        this.getProdutos(codPro)
        this.setState({
          isOpenModal: false,
          isOpenModalInsertProduct: true
        })
        break;
      case "modality":
        const codMod = data.codMod;
        this.getModalidades(codMod)
        this.setState({
          pesquisaModalidade: codMod,
          isOpenModal: false,
        })
        break;
    }
  }

  getClientes = (codCli) => {
    if (codCli == null)
      codCli = Number(this.state.pesquisaCliente)
    if (!isNaN(codCli)) {
      axios.get(`http://localhost:3001/cliente/${localStorage.getItem("sipCnpj")}/code/${codCli}`, {
        headers: {
          "Authorization": `bearer ${localStorage.getItem("sipToken")}`
        }
      }).then(res => {
        if(typeof res.data.codCli !== "undefined")
          this.setState({
            codCli: res.data.codCli,
            nomeClienteInserido: res.data.nomCli,
            pesquisaCliente: res.data.nomCli,
            codCienteInserido: res.data.codCli
          });
        else
          alert('Nenhum cliente encontrado com o código ' + codCli)  
      })
    } else {
      axios.get(`http://localhost:3001/cliente/${localStorage.getItem("sipCnpj")}/name/${this.state.pesquisaCliente}`, {
        headers: {
          "Authorization": `bearer ${localStorage.getItem("sipToken")}`
        }
      }).then(res => {
        if(res.data.length > 0)
          this.setState({
            dataModal: res.data,
            tittleModal: `Pesquisa Cliente por: ${this.state.pesquisaCliente}`,
            keysModal: this.keysCliente,
            dataTypeModal: "client",
            isOpenModal: true
          });
        else
          alert('Nenhum cliente encontrado com o nome ' + this.state.pesquisaCliente)
      })
    }
    this.setState({
      isOpenModal: false
    })
  }

  getModalidades = () => {
    axios.get(`http://localhost:3001/modalidade/${localStorage.getItem("sipCnpj")}`, {
      headers: {
        "Authorization": `bearer ${localStorage.getItem("sipToken")}`
      }
    }).then(res => {
      let codMod = Number(this.state.pesquisaModalidade)
      let modalidade = res.data.filter((e) => {
        if (e.codMod === codMod) return e;
      })
      if (modalidade.length > 0) {
        this.setState({
          codModalidade: modalidade[0].codMod,
          nomeModalidade: modalidade[0].ideMod
        });
      } else {
        this.setState({
          dataModal: res.data,
          tittleModal: 'Insira a modalidade desejada:',
          keysModal: this.keysModalidade,
          dataTypeModal: "modality",
          isOpenModal: true
        });
      }
    })
  }


  gravarPedido = () =>{
    if(this.state.codCienteInserido === 0){
      alert('Cliente não inserido ou inválido!')
      return
    }
    if(this.state.codModalidade === 0){
      alert('Modalidade não inserida ou inválida!')
      return
    }
    if(this.state.pedidoProdutos.length === 0){
      alert('Nenhum produto inserido no pedido!')
      return
    }

    const axiosConfig = {
      headers: {
        'Authorization': `bearer ${localStorage.getItem("sipToken")}`
      }
    };
    const codAte = 1; //necessita ser buscado na api os valore necessarios
    var md5 = require('md5');
    const pedido = {
      'codLoj': 1,
      'codAte': codAte,
      'codMod': this.state.codModalidade,
      'codCli': this.state.codCienteInserido,
      'nomCli': this.state.nomeClienteInserido,
      'perDes': 0.0,
      'vlrReg': this.getTotalPedido(),
      'data': new Date(),
      'hora': new Date(),
      'obsAte': '',
      'idDisp': md5(codAte.toString().substring(0,15)),
      'produtosPedido': this.state.pedidoProdutos
    }
    axios.post(`http://localhost:3001/pedido/${localStorage.getItem("sipCnpj")}`, JSON.parse(JSON.stringify(pedido)), axiosConfig).then((response) => {
        if(response.status === 201){
          alert("Pedido inserido com sucesso!")
          //setUserToEdit(null)
        }
      }).catch((e) => {
        console.log(e)
        alert(e?.message)
      }).then((r)=>{
        console.log(r)
      })
    //console.log(pedido)
  }


  getProdutos = (codPro) => {
    if (codPro == null)
      codPro = Number(this.state.pesquisaProduto)
    if (!isNaN(codPro)) {
      axios.get(`http://localhost:3001/produto/${localStorage.getItem("sipCnpj")}/code/${codPro}`, {
        headers: {
          "Authorization": `bearer ${localStorage.getItem("sipToken")}`
        }
      }).then(res => {
        if(typeof res.data.codPro !== "undefined")
          this.setState({
            produtoASerInserido: res.data,
            codPro: res.data.codPro,
            isOpenModalInsertProduct: true,
            pesquisaProduto: res.data.nomPro
          });
        else
          alert('Nenhum produto encontrado com o código ' + codPro)
      })
    } else {
      axios.get(`http://localhost:3001/produto/${localStorage.getItem("sipCnpj")}/name/${this.state.pesquisaProduto}`, {
        headers: {
          "Authorization": `bearer ${localStorage.getItem("sipToken")}`
        }
      }).then(res => {if(res.data.length > 0)
          this.setState({
            dataModal: res.data,
            tittleModal: `Pesquisa produto por: ${this.state.pesquisaProduto}`,
            keysModal: this.keysProduto,
            dataTypeModal: "product",
            isOpenModal: true
          });
        else
          alert('Nenhum poduto encontrado com o nome ' + this.state.pesquisaProduto)
      })
    }
    this.setState({
      isOpenModal: false,
      isOpenModalInsertProduct: false
    })
  }

  getTotalPedido = () =>{
    return this.state.pedidoProdutos.reduce((acumulado, valorIteracao) => {
      return acumulado + valorIteracao?.totIte
    }, 0)
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
                  paddingBottom: "10px",
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
                <h5>{this.state.nomeClienteInserido != null ? <strong>Cliente selecionado: <strong className="nomeCliente">{this.state.nomeClienteInserido}</strong></strong> : ''}</h5>
                <h5>{this.state.nomeModalidade != null ?<strong>Modalidade: <strong className="nomeModalidade"> {this.state.nomeModalidade}</strong></strong> : ''}</h5>
              </div>
            </Col>
          </Row>
          <Row className="row">
            <Col sm={2}>
              <strong className={"fieldName"}>Modalidade</strong>
              <Input
                id={"modalidade"}
                name={"modalidade"}
                type={"number"}
                whenChange={this.setPesquisaModalidade}
              >
              </Input>
            </Col>
            <Col sm={2}>
              <Button
                label={"Inserir"}
                onClick={() => {
                  this.getModalidades()
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
          <Row className="row">
            <Col sm={6}>
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
            <Col sm={2} className="cancelButton">
              <Button

                label={"Cancelar"}
                onClick={() => {
                  this.getProdutos()
                }}>
              </Button>
            </Col>
            <Col sm={2} className="saveButton">
              <Button
                label={"Gravar"}
                onClick={() => {
                  this.gravarPedido()
                }}>
              </Button>
            </Col>
          </Row>
          <Row>
            <Col sm={12}>
              <div className="table">
                <Table
                  keys={[
                    'seqIte',
                    'codPro',
                    'desPro',
                    'qtdIte',
                    'vlrUni',
                    'perDes',
                    'vlrDes',
                    'vlrLiq',
                    'totIte'
                  ]}
                  data={this.state.pedidoProdutos}
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
          returnedModalProductData={this.returnedModalProductData}
        />
        <div className="footer">
          <strong>{this.toDefaultMoneyMask(this.getTotalPedido())}</strong>
        </div>

      </div>

    );
  }
}
