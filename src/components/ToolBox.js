import React from 'react';

function ToolBox(props) {
   
    let handle = 'toolBox';

    //Mobile
    if(props.mobile){

      return (

        <div className='mobile_taskBar'>
         <button className='mobile_newPostbutton' onClick={(e)=> props.newArticle()}>NEW POST</button> 
         <button className='mobile_editPostbutton' onClick={(e)=> props.editArticle()}>EDIT POST</button>
        </div>
     
      )
 
    }
    //Desktop
    else{

      return (

        <div className='toolBoxContainer' onClick={(e)=>props.clickToEnable(e,handle)}>
         <p className='toolBoxText'>TOOLBOX</p>
         <button className='newPostbutton' onClick={(e)=> props.newArticle()}>NEW POST</button>
         <button className='editPostbutton' onClick={(e)=> props.editArticle()}>EDIT POST</button>
        </div>
    
    
      )

      
    }

    
 
 
}

export default ToolBox;