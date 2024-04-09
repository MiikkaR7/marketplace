import './Input.css';
import React, { forwardRef } from 'react';

const Input = forwardRef((props, ref) => {
    return (
        <div className='form-control'>
        <label htmlFor={props.id}>{props.label}</label>
        <input ref={ref} id={props.id} type={props.type} step={props.step} min={props.min} defaultValue={props.defaultValue} placeholder={props.placeholder}/>
        </div>
    )
});

export default Input;