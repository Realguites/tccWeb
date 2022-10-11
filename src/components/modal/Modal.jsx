import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';
import { useEffect } from "react";
import Table from '../table/Table';


export default props => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (props.isOpenModal) {
      handleShow()
      console.log('KEYS: ', props.keys)
    }
  }, [props.isOpenModal])


  function getDataFromTable(condition, data){
    if(condition === 'update'){
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
        show={props.isOpenModal || show}
        onHide={props.isOpenModal || handleClose}
        size="lg"
       >
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Table
            keys={props.keys}
            data={props.data}
            returnLineData={getDataFromTable}
            type={"pesquisaCliente"}
          ></Table>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}