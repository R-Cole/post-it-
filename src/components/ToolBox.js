import React from 'react';

function ToolBox(props) {
   
    let handle = 'toolBox';

    return (

      <div className='toolBoxContainer' onClick={(e)=>props.clickToEnable(e,handle)}>
       <p className='toolBoxText'>TOOLBOX</p>
       <button className='newPostbutton' onClick={(e)=> props.newArticle()}>NEW POST</button>
       <button className='editPostbutton' onClick={(e)=> props.editArticle()}>EDIT POST</button>
      </div>
  
  
    )
 
 
}

export default ToolBox;