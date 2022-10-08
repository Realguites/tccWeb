import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { useEffect } from "react";
import Input from '../input/Input';
import './ModalInsertProduct.css'
import { Row, Col } from 'react-grid-system';


export default props => {
  const [show, setShow] = useState(false);
  const [codPro, setCodPro] = useState(0);
  const [desPro, setDesPro] = useState(0);
  const [qtdPed, setQtdPed] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (props.isOpenModal) {
      handleShow()
      console.log('PRODUTO:: ', props.produto)
    }
  }, [props.isOpenModal])


  function getDataFromTable(condition, data) {
    if (condition === 'update') {
      //if(window.confirm(`Tem certeza que deseja excluir ${data?.usuario}? Isso é irreversível!`)){
      //deleteUser(data?.id)
      console.log(data)
      props.selectedData(data)
      //deleteSmartphone(data?.idDisp)
      //}
    }
    //}

  }
  return (
    <>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="row">
            <Col sm={4}>
              <div className="groupStrongRevealData">
                <strong>Código</strong>
                <strong className="modalPresentData">{props?.produto?.codPro}</strong>
              </div>
            </Col>
            <Col sm={8}>
              <div className="groupStrongRevealData">
                <strong>Descrição</strong>
                <strong className="modalPresentData">{props?.produto?.desPro}</strong>
              </div>
            </Col>
          </Row>
          <Row className="row">
            <Col sm={4}>
              <div className="groupStrongRevealData">
                <strong>Estoque</strong>
                <strong className="modalPresentData">{props?.produto?.quantidade?.qtdLoj}</strong>
              </div>
            </Col>
            <Col sm={4}>
              <div className="groupStrongRevealData">
                <strong>Unidade</strong>
                <strong className="modalPresentData">{props?.produto?.uniPro}</strong>
              </div>
            </Col>
            <Col sm={4}>
              <div className="groupStrongRevealData">
                <strong>Preço líquido</strong>
                <strong className="modalPresentData">{props?.produto?.quantidade?.prcLiq.toLocaleString('pt-br', {
                  currency: 'BRL',
                  style: 'currency',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}</strong>
              </div>
            </Col>
          </Row>

          <Row className="row">
            <Col sm={4}>
              <div className="groupStrongRevealData">
                <strong>Preço de venda</strong>
                <strong className="modalPresentData">{props?.produto?.quantidade?.prcVen.toLocaleString('pt-br', {
                  currency: 'BRL',
                  style: 'currency',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}</strong>
              </div>
            </Col>
            <Col sm={4}>
              <div className="groupStrongRevealData">
                <strong>% Desconto</strong>
                <input
                  className="inputModalProduct"
                  id={"perDes"}
                  name={"perDes"}
                  type={"number"}
                  onChange={(e)=>{
                    setDesPro(e.target.value)
                  }}
                  ></input>
              </div>
            </Col>
            <Col sm={4}>
              <div className="groupStrongRevealData">
                <strong>Quantidade a Inserir</strong>
                <input
                  className="inputModalProduct"
                  id={"qtdPed"}
                  name={"qtdPed"}
                  type={"number"}
                  onChange={(e)=>{
                    setQtdPed(e.target.value)
                  }}
                ></input>
              </div>
            </Col>
          </Row>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={((e)=>{
            props.returnedModalProductData(codPro, desPro, qtdPed)
          }),
          handleClose
          }>
            Inserir Produto
          </Button>
          <Button variant="danger" onClick={
            handleClose
          }>
            Cancelar
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}