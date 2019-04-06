import React from 'react';

function ToolBox(props) {
   
    let handle = 'toolBox';

    return (

      <div className='toolBoxContainer' onClick={(e)=>props.clickToEnable(e,handle)}>
       <p className='toolBoxText'>TOOLBOX</p>
       <br/>
       <button className='button' onClick={(e)=> props.newArticle()}>NEW POST</button>
       <button className='button' onClick={(e)=> props.newArticle()}>EDIT POST</button>
      </div>
  
  
    )
 
 
}

export default ToolBox;