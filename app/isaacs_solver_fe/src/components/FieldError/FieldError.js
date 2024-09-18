// FieldError.js
import React, { useState } from 'react';
import './FieldError.css';

const FieldError = (props) => {
  function handleChange(e) {
      props.setValue(e.target.value);
  }  

  return (
          <div>
            <input 
                type="text" 
                value={props.val} 
                onChange={handleChange} 
                placeholder={props.placeholder}
                
            />
          </div>
        );
      };

export default FieldError;
