import { useState } from 'react';
import './input.css'

export default props => {
    
    return (
        <div className="field">
            <input
            id={props.id}
            name={props.name}
            type={props.type}
            placeholder={props.placeholder}
            onChange={props.whenChange}
        />
        </div>
        
    )
}