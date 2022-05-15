import { useState } from 'react';
import './input.css'

export default props => {
    const [valor, setValor] = useState('Inicial');

    function quandoMudar(e) {
        setValor(e.target.value)
    }
    return (
        <div className="field">
            <input
            type={props.type}
            placeholder={props.placeholder}
            onChange={quandoMudar}
        />
        </div>
        
    )
}