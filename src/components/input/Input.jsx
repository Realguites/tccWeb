import { useState, useEffect } from 'react';
import './input.css'

export default props => {

    const [valueState, setValueState] = useState('');

    useEffect(() => {
        setValueState(props?.inputValue)
    }, [props?.inputValue])

    function whenChangeState(e){
        const initialValue = e.target.value  
        setValueState(initialValue)
        props.whenChange(initialValue)
    }
    return (
        <div className="field">
            <input
            id={props.id}
            name={props.name}
            type={props.type}
            placeholder={props.placeholder}
            value={valueState}
            onChange={whenChangeState}
        />
        </div>
        
    )
}