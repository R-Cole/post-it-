import React from 'react';
import { connect } from 'react-redux';
import List from './List';
import ToolBox from '../components/ToolBox';
import AddArticleForm from '../components/AddArticleForm';
import { addArticle, editArticle } from '../actions/action';
import HandCursor from '../assets/images/hand.png';

const root = document.querySelector(':root');
root.style.setProperty('--toolBoxTop', '95px');
root.style.setProperty('--toolBoxLeft', '15px');
root.style.setProperty('--cursorHand','auto'); 
root.style.setProperty(`--addArticleLeft`,`${300}px`);
root.style.setProperty(`--addArticleTop`,`${20}px`);

// root.style.setProperty('--articleTop', '22px');
// root.style.setProperty('--articleLeft', '22px');
// root.style.setProperty('--zIndex', '-1');
 
export class Display extends React.Component {
  
  constructor(props){
    super(props);

    this.state = {
      moveElement: null,
      mode: 'ready',
      showAddArticle: false,
      articleCount: 0,
      moveEnabled: false,
      editAdd_X: null,
      editAdd_Y: null
    }

    this.submitForm = this.submitForm.bind(this);
    this.newArticle = this.newArticle.bind(this);
    this.editArticle = this.editArticle.bind(this);
    this.clickToEnable = this.clickToEnable.bind(this);
    this.moveEnabled = this.moveEnabled.bind(this);
  }

  editArticle = () => {

    console.log('edit article select...');

    this.setState({
      mode: 'select' 
    })
 
  }
   
  //Save the new article from values
  submitForm = (values) => {
    
    //ADD a new article
    if(this.state.mode === 'add'){
      
      let addCount = this.state.articleCount + 1;

      const newArticle = {

        articleCount: addCount,
        title: values.title,
        content: values.content,
        author: values.author
 
      }
 
      this.props.dispatch(addArticle(newArticle));
 
       //for the article counter...
       this.setState({
        mode: 'ready', 
        articleCount: addCount,
        showAddArticle: false,
        moveEnabled: false
      })

      //add randomness to start X and Y
      // let randXadd = Math.random() * (33 - 3) + 3; 
      // let neg = Math.random() * (2 - 1) + 1; 
      // if(neg === 2){randXadd = randXadd * -1};

      // let randYadd = Math.random() * (33 - 3) + 3;
      // neg = Math.random() * (2 - 1) + 1; 
      // if(neg === 2){randYadd = randYadd * -1};

      //get the toolbox coords and adjust with offsets
      let newArticle_X = parseInt(root.style.getPropertyValue(`--toolBoxLeft`)) + 135;
      let newArticle_Y = parseInt(root.style.getPropertyValue(`--toolBoxTop`)) - 35;

      //set start place for new article based on the efault toolbox coords
      root.style.setProperty(`--articleLeft${this.state.articleCount}`,`${newArticle_X}px`);
      root.style.setProperty(`--articleTop${this.state.articleCount}`,`${newArticle_Y}px`);
      root.style.setProperty('--cursorHand','auto'); 
 
    }

    //EDIT an existing article
    if(this.state.mode === 'edit'){
      
      let handle = this.state.moveElement

      const editedArticle = {

        articleCount: handle + 1,
        title: values.title,
        content: values.content,
        author: values.author
 
      }
 
      //Edit article action
      this.props.dispatch(editArticle(editedArticle,handle));
  
      //for the article counter...
      this.setState({
        mode: 'ready', 
        showAddArticle: false,
        moveEnabled: false
      })

      //add randomness to start X and Y
      // let randXadd = Math.random() * (33 - 3) + 3; 
      // let neg = Math.random() * (2 - 1) + 1; 
      // if(neg === 2){randXadd = randXadd * -1};

      // let randYadd = Math.random() * (33 - 3) + 3;
      // neg = Math.random() * (2 - 1) + 1; 
      // if(neg === 2){randYadd = randYadd * -1};
 
      //use existing x y coords
      //root.style.setProperty(`--articleLeft${this.state.articleCount}`,`${300 + randXadd}px`);
      //root.style.setProperty(`--articleTop${this.state.articleCount}`,`${18 + randYadd}px`);
      root.style.setProperty('--cursorHand','auto'); 
 
    }//end edit

  }

  deleteForm = () => {

    //for the article counter...
    this.setState({
      mode: 'ready', 
      showAddArticle: false,
      moveEnabled: false
    })


  }

  //Open the add article form
  newArticle = () => {

    root.style.setProperty('--cursorHand','auto'); 

    //get the toolbox coords and adjust with offset
    let toolBox_X = parseInt(root.style.getPropertyValue(`--toolBoxLeft`)) + 135;
    let toolBox_Y = parseInt(root.style.getPropertyValue(`--toolBoxTop`)) - 35;
  
    //put add article form in default location near toolbox
    root.style.setProperty(`--addArticleLeft`, `${toolBox_X}px`);
    root.style.setProperty(`--addArticleTop`, `${toolBox_Y}px`);
  
    //for the article counter...
    this.setState({
     mode: 'add',
     showAddArticle: true,
     moveEnabled: false
    })

  }

  //enable movement or select article in EDIT mode
  clickToEnable(e,handle){
    
    //activate movement

    //OFF
    if(this.state.moveEnabled && this.state.mode !== 'add' && this.state.mode !== 'select'){

      root.style.setProperty('--cursorHand','auto'); 
      root.style.setProperty(`--articleZindex${this.state.moveElement}`,`0`);
 
      this.setState({
        moveElement: null,
        moveEnabled: false,
         
  
      })
    }
    //ON
    if(!this.state.moveEnabled && this.state.mode !== 'add' && this.state.mode !== 'select'){
   
      this.setState({
        moveElement: handle,
        moveEnabled: true
  
      })

    }

    //select post to edit
    if(this.state.mode === 'select'){

      console.log('handle: ',handle);
      
      this.setState({
        mode: 'edit',
        moveElement: handle,
        moveEnabled: false,
        showAddArticle: true
  
      })
 
      //put add article form on top of current selection 
      root.style.setProperty(`--addArticleLeft`,root.style.getPropertyValue(`--articleLeft${handle}`));
      root.style.setProperty(`--addArticleTop`,root.style.getPropertyValue(`--articleTop${handle}`));
 
    }//end select
  
  }
  
  //moves whatever element is active
  moveEnabled(e){
 
    //console.log('clientY: ',e.clientY,'pageY: ',e.pageY,);

    //console.log('this.state.moveElement ',this.state.moveElement );

    if(this.state.mode === 'ready' && this.state.moveEnabled){
 
      // console.log('moving!');
      // console.log('X ',e.pageX);
      // console.log('Y ',e.pageY);
 
      // root.style.setProperty('--main-color', randomHSL());


      //move post-its
      if(this.state.moveElement !== 'toolBox'){

        //set custom hand cursor
        root.style.setProperty('--cursorHand',`url(${HandCursor}),auto`); 

        let Yadd = 30;//(parseInt(this.state.moveElement) + 1) * 250;
         
        let Xclient = e.clientX;
        let Yclient = e.clientY;

        if(e.pageY > Yclient){

          Yclient = e.pageY;

        }
 
        root.style.setProperty(`--articleLeft${this.state.moveElement}`,`${Xclient - 80}px`);
        root.style.setProperty(`--articleTop${this.state.moveElement}`,`${Yclient - Yadd}px`);
        root.style.setProperty(`--articleZindex${this.state.moveElement}`,`+1`);
      }
  
      //move toolbox
      if(this.state.moveElement === 'toolBox'){

        //set custom hand cursor
        root.style.setProperty('--cursorHand',`url(${HandCursor}),auto`);

        let Xclient = e.clientX;
        let Yclient = e.clientY;

        if(e.pageY > Yclient){

          Yclient = e.pageY;

        }

        //toolbox
        root.style.setProperty('--toolBoxLeft',`${Xclient - 10}px`);
        root.style.setProperty('--toolBoxTop',`${Yclient - 20}px`);
        
      }
 
    }
 
  }

  render(){

    let theArticle;
 
    if(this.state.mode === 'edit'){
 
      let handle = this.state.moveElement;
      theArticle  = this.props.articles[handle];
 
    }
    else {

      theArticle  = {
        articleCount: this.state.articleCount,
        title: null,
        content: null,
        author: null
      }
 
    }
 
    return(
       
      <div className='displayContainer' onMouseMove={(e)=>this.moveEnabled(e)}>
        <List 
          selectedArticle={this.state.moveElement} 
          clickToEnable={this.clickToEnable} 
          moveEnabled={this.moveEnabled}
        />
        {this.state.showAddArticle && 
          <AddArticleForm 
            onSubmit={this.submitForm}
            deleteForm={this.deleteForm}
            articleCount={this.state.moveElement}
            mode={this.state.mode}
            handle={this.state.moveElement}
            articles={this.props.articles}
            initialValues={theArticle}
        />}
        
        <ToolBox 
          newArticle={this.newArticle}
          editArticle={this.editArticle} 
          clickToEnable={this.clickToEnable}/>
        <h4 className='HeadlineContainer' >POST IT! </h4>
        <p>article count: {this.state.articleCount}</p>
        <p>handle: {this.state.moveElement}</p>
        <p>mode: {this.state.mode}</p>
        <p>moveEnabled: {(this.state.moveEnabled)? 'true': 'false'}</p>
 
      </div>
 
    )
 
  }
 
}
  
const mapStateToProps = (state) => {

  return {

    articles: state.randyReducer.articles

  };

};

export default connect(mapStateToProps)(Display);