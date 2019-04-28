import React from 'react';

export default function Help(props){

  let m_HelpContainer = 'HelpContainer';
  let message = 
    <div className = 'HelpText'>
      CLICK on a Post or the Toolbox to move it<br/>
      CLICK it again to stop<br/>
      To EDIT a note: CLICK EDIT then select note by clicking on it<br/>
      Have Fun!
    </div>

  if(props.mobile){
    m_HelpContainer = 'mobile_HelpContainer';
    message = 
    <div className = 'HelpText'>
      CLICK on a Post to expand it or collapse it.<br/>
      To EDIT a note: CLICK EDIT then select the note by clicking on it<br/>
      Have Fun!
    </div>
  }

  return(
 
    <div className = {m_HelpContainer} onClick = {() => props.showHelp()}>
      {message}
    </div>
 
  )
 
}
