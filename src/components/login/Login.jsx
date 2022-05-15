import './login.css'
import Input from '../input/Input'

export default props =>{
    return (
        <div style={{ 
            backgroundImage: `url("/background_login.png")`,
            display: "table",
            width: "100%",
            height: "100vh",
            backgroundSize: "cover",
          }}>
          <img 
            src={require("/home/guilherme/Documents/SENAC/tcc/sip_web/src/components/login/cgm_logo.png")}
            style={{
              maxWidth: "400px",
              width: "100%",
              height: "auto"
            }}
          >
          </img>

          <div className="Card">
            <h1>Sistema Integrador de Pedidos (SIP)</h1>
            <Input 
              type={"email"} 
              placeholder={"Usuário"}
            >
            </Input>
            <Input 
              type={"password"} 
              placeholder={"Senha"}
            >
            </Input>
            <button>Acessar</button>

          </div>
            
          </div>
    )
}