import React from 'react';
 
const InputField = ({

      input,
      label,
      type,
      placeholder,
      onChange  
   
    }) => (
       
        <div>
        <input {...input} type={type} placeholder={placeholder} onChange={onChange}/>
        <label>{label}</label> 
        </div>
 
    
)
 
export default InputField;

     
 