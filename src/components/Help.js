import React from 'react';

export default function Help(props){

  let m_HelpContainer = 'HelpContainer';

  if(props.mobile){
    m_HelpContainer = 'mobile_HelpContainer';
  }

  return(

    

    <div className = {m_HelpContainer}>
      <div className = 'HelpText'>
      Click on a Post or the Toolbox to move it<br/>
      Click it again to stop<br/>
      To EDIT a note: click EDIT then select note by clicking on it<br/>
      Have Fun!</div>
    </div>
 
  )
 
}
