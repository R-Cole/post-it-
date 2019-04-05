import React from 'react';

function ToolBox(props) {
   
    let handle = 'toolBox';

    return (

      <div className='toolBoxContainer' onClick={(e)=>props.clickToEnable(e,handle)}>
       <p className='toolBoxText'>TOOLBOX</p>
       <br/>
       <button className='button' onClick={(e)=> props.newArticle()}>ADD ARTICLE</button>
       <button className='button' onClick={(e)=> props.newArticle()}>EDIT ARTICLE</button>
      </div>
  
  
    )
 
 
}

export default ToolBox;