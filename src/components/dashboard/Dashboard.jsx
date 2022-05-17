import { setConfiguration } from 'react-grid-system';
import { Container, Row, Col } from 'react-grid-system';


export default function Dashboard() {

  setConfiguration({ maxScreenClass: 'xl' });
  let usuarioNome = '';

  if(localStorage.getItem("sipToken") !== null){
    usuarioNome = localStorage.getItem("sipUser").substring(0,localStorage.getItem("sipUser").indexOf(" ") + 1)
  }else{
    window.location.href="/"
  }

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
          <h2>Bem-vindo(a) <strong>{usuarioNome}</strong></h2>
        </Col>
      </Row>
    </Container>
  );
}