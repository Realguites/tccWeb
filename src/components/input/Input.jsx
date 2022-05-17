import { useState } from 'react';
import './input.css'

export default props => {
    
    return (
        <div className="field">
            <input
            type={props.type}
            placeholder={props.placeholder}
            onChange={props.whenChange}
        />
        </div>
        
    )
}