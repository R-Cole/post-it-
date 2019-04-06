import React from 'react';
import { connect } from 'react-redux';
import List from './List';
import ToolBox from '../components/ToolBox';
import AddArticleForm from '../components/AddArticleForm';
import { addArticle } from '../actions/action';

const root = document.querySelector(':root');
root.style.setProperty('--toolBoxTop', '95px');
root.style.setProperty('--toolBoxLeft', '15px');
root.style.setProperty('--cursorHand','auto'); 

// root.style.setProperty('--articleTop', '22px');
// root.style.setProperty('--articleLeft', '22px');
// root.style.setProperty('--zIndex', '-1');
 

export class Display extends React.Component {
  
  constructor(props){
    super(props);

    this.state = {
      moveElement: null,
      moveMode: 'ready',
      showAddArticle: false,
      articleCount: 0,
      moveEnabled: false
    }

    this.submitForm = this.submitForm.bind(this);
    this.newArticle = this.newArticle.bind(this);
    this.clickToEnable = this.clickToEnable.bind(this);
    this.moveEnabled = this.moveEnabled.bind(this);
  }
   
  //Save the new article from values
  submitForm = (values) => {
  
      const newArticle = {

        articleCount: this.state.articleCount + 1,
        title: values.title,
        content: values.content,
        author: values.author
 
      }
 
      this.props.dispatch(addArticle(newArticle));

      let addCount = this.state.articleCount + 1;

       //for the article counter...
       this.setState({
        moveMode: 'ready', 
        articleCount: addCount,
        showAddArticle: false,
        moveEnabled: false
      })

      //add randomness to start X and Y
      let randXadd = Math.random() * (33 - 3) + 3; 
      let neg = Math.random() * (2 - 1) + 1; 
      if(neg === 2){randXadd = randXadd * -1};

      let randYadd = Math.random() * (33 - 3) + 3;
      neg = Math.random() * (2 - 1) + 1; 
      if(neg === 2){randYadd = randYadd * -1};


      //set start place for new article
      root.style.setProperty(`--articleLeft${this.state.articleCount}`,`${300 + randXadd}px`);
      root.style.setProperty(`--articleTop${this.state.articleCount}`,`${18 + randYadd}px`);
      root.style.setProperty('--cursorHand','auto'); 
 
  }

  //Open the add article form
  newArticle = () => {

    root.style.setProperty('--cursorHand','auto'); 
  
    //for the article counter...
    this.setState({
     moveMode: 'add',
     showAddArticle: true,
     moveEnabled: false
    })

  }

  //enable movement or select article in EDIT mode
  clickToEnable(e,handle){
    
    //activate movement

    //OFF
    if(this.state.moveEnabled && this.state.moveMode !== 'add'){

      root.style.setProperty('--cursorHand','auto'); 

      root.style.setProperty(`--articleZindex${this.state.moveElement}`,`0`);
 
      this.setState({
        moveElement: null,
        moveEnabled: false
  
      })
    }
    //ON
    else if(!this.state.moveEnabled && this.state.moveMode !== 'add'){

      
       
      this.setState({
        moveElement: handle,
        moveEnabled: true
  
      })

    }

    //select post to edit
    if(!this.state.moveEnabled && this.state.moveMode !== 'editSelect'){
 
      //select?

      //the handle is the index for the 'article'

      //reload article into a form?
      //or
      //edit article on article?

      // this.setState({
      //   moveElement: handle,
      //   moveEnabled: true
  
      // })

    }

     
  }
 

  //moves whatever element is active
  moveEnabled(e){
 
    //console.log('clientY: ',e.clientY,'pageY: ',e.pageY,);

    //console.log('this.state.moveElement ',this.state.moveElement );

    if(this.state.moveMode === 'ready' && this.state.moveEnabled){
 
      // console.log('moving!');
      // console.log('X ',e.pageX);
      // console.log('Y ',e.pageY);
 
      // root.style.setProperty('--main-color', randomHSL());


      //move post-its
      if(this.state.moveElement !== 'toolBox'){

        root.style.setProperty('--cursorHand','url(http://www.javascriptkit.com/dhtmltutors/cursor-hand.gif),auto'); 

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
 
    // const doThis = function(arg){

    //   this.arg = arg;
  
    //   this.functionOne = () =>{console.log('hello from doThis 1: ', this.arg);};
  
    //   this.functionTwo = () =>{console.log('hello from doThis 2: ', this.arg);};
  
    // }

    // const done = new doThis('wow');

    // done.functionOne();
    // done.functionTwo();
 
    return(
       
      <div className='displayContainer' onMouseMove={(e)=>this.moveEnabled(e)}>
        <List selectedArticle={this.state.moveElement} clickToEnable={this.clickToEnable} moveEnabled={this.moveEnabled}/>
        {this.state.showAddArticle && <AddArticleForm onSubmit={this.submitForm}/>}
        
        <ToolBox newArticle={this.newArticle} clickToEnable={this.clickToEnable}/>
        <h4 className='HeadlineContainer' >POST IT! </h4>
        <p>article count: {this.state.articleCount}</p>
        <p>handle: {this.state.moveElement}</p>
        
      </div>
 
    )


  }

  
   
}
 

const mapStateToProps = (state) => {

  return {

    useArticles: state.articles

  };

};

export default connect (mapStateToProps)(Display);