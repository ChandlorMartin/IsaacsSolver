import React, {useState} from 'react';
import Select from 'react-select'
import { MathJax } from "better-react-mathjax";
import './FieldSection.css';

const FieldSection = (props) => {

    function handleChange(e) {
        props.setValue(e.target.value);
    }

    function handleSelectChange(selectedOption) {
        if (selectedOption) {
            console.log("selected Option")
            props.setUnits(selectedOption.value);
        }else {
            console.log("NOT selected Option")
        }
    }

    return (
        <div className='FieldSection'>
            <text className='FieldName'>{props.name}</text>
            <input type="text" 
                value={ props.val } 
                onChange={handleChange} 
                placeholder={props.placeholder}
            />
            <div className = 'Units'>
            <Select 
                defaultValue={props.units[0]}
                options={props.units}
                onChange={ handleSelectChange }
            />
            </div>
        </div>
);
};

export default FieldSection;
