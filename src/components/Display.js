import React from 'react';
import { connect } from 'react-redux';
import { isMobile } from 'react-device-detect';
import List from './List';
import ToolBox from '../components/ToolBox';
import Help from '../components/Help';
import AddArticleForm from '../components/AddArticleForm';
import ArticleZoom from '../components/ArticleZoom';
import { addArticle, editArticle, deleteArticle } from '../actions/action';
import HandCursor from '../assets/images/hand.png';
//import { isNull } from 'util';

const root = document.querySelector(':root');
root.style.setProperty('--toolBoxTop', '95px');
root.style.setProperty('--toolBoxLeft', '15px');
root.style.setProperty('--cursorHand','auto'); 
root.style.setProperty(`--addArticleLeft`,`${300}px`);
root.style.setProperty(`--addArticleTop`,`${20}px`);

root.style.setProperty(`--zoom_Y_Location`,`${0}px`);


//Not mobile -- full movement capablilites...
if(!isMobile){
  root.style.setProperty('--articleW',`${300}px`);
  root.style.setProperty('--articleH',`${300}px`);
}
//Mobile grid all with Title only -- zoom to note with touch...
else{
  root.style.setProperty('--articleW',`${300}px`);
  root.style.setProperty('--articleH',`${70}px`);
}
 

let showTouchX;
let showTouchY;
let showEventType;
 
export class Display extends React.Component {
  
  constructor(props){
    super(props);

    this.state = {
      moveElement: null,
      mode: 'ready',
      showAddArticle: false,
      moveEnabled: false,
      editAdd_X: null,
      editAdd_Y: null,
      showHelp: true,
      zoom:false,
      zoomElement: null,
      editElement: null
    }

    this.submitForm = this.submitForm.bind(this);
    this.newArticle = this.newArticle.bind(this);
    this.editArticle = this.editArticle.bind(this);
    this.clickToEnable = this.clickToEnable.bind(this);
    this.moveEnabled = this.moveEnabled.bind(this);
    this.showHelp = this.showHelp.bind(this);
    this.zoomPost = this.zoomPost.bind(this);
  }
 
  //edit selected note
  editArticle = () => {
    
    //article is already zoomed in...
    if(this.state.mode === 'zoomed' && this.props.articles.length > 0 ){
       
      let handle = this.state.zoomElement;

      this.setState({
        mode: 'edit',
        moveElement: null,
        moveEnabled: false,
        showAddArticle: true,
        showHelp: false,
        editElement: handle,
        zoom: false,
        zoomElement: null

      })
 
    }

    if(this.state.mode === 'ready' && this.props.articles.length > 0){
    
      this.setState({
        mode: 'select', 
      })

    }
    else {

      this.setState({
        moveEnabled: false,
        moveElement: null,
      })

    }
 
  }
   
  //Save the new article from values
  submitForm = (values) => {
    
    //ADD a new article
    if(this.state.mode === 'add'){
  
      let id = 1;//for first id
 
      //generate numeric id if articles array has more than 1 element...
      if(this.props.articles.length > 0){
 
        //Sort for highest ID
        function sortByScores(array, key){
           return array.sort((a, b) => {
            return b[key]-a[key];
          });
        }

        //deep copy array
        const articlesCopy = [...this.props.articles];
 
        //sort array based on highest id#
        const highestIdArr = sortByScores(articlesCopy,'articleId');
      
        //set new id as highest + 1
        id = highestIdArr[0].articleId + 1;
   
      }
  
      //set new article
      const newArticle = {

        articleId: id,
        title: values.title,
        content: values.content,
        author: values.author
 
      }
 
      this.props.dispatch(addArticle(newArticle));
 
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

      //get the toolbox coords and adjust with offsets
      let newArticle_X = parseInt(root.style.getPropertyValue(`--toolBoxLeft`)) + 135;
      let newArticle_Y = parseInt(root.style.getPropertyValue(`--toolBoxTop`)) - 35;

      //set start place for new article based on the default toolbox coords
      root.style.setProperty(`--articleLeft${id}`,`${newArticle_X}px`);
      root.style.setProperty(`--articleTop${id}`,`${newArticle_Y}px`);
      root.style.setProperty('--cursorHand','auto'); 
 
    }

    //EDIT an existing article
    if(this.state.mode === 'edit'){
      
      let handle = this.state.editElement

      const editedArticle = {

        articleId: handle,
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
        moveEnabled: false,
        zoomElement: null,
        zoom: false,
        editElement: null
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
 
    //dispatch delete action if note exists 
    if(this.state.mode === 'edit'){

      this.props.dispatch(deleteArticle(this.state.editElement));
 
    }

    //for the article counter...
    this.setState({
      mode: 'ready', 
      showAddArticle: false,
      moveEnabled: false,
      editElement: null
    })
 
  }

  //Open the add article form
  newArticle = () => {

    window.scrollTo(0, 0);

    if(this.state.mode === 'ready'){

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
        moveEnabled: false,
        showHelp: false,
        zoomElement: null,
        zoom: false
      })
 
    }
 
  }

  //enable/disable movement or select article in EDIT mode
  clickToEnable(e,handle){
   
    //activate movement

      //OFF
      if(this.state.moveEnabled && this.state.mode !== 'add' && this.state.mode !== 'select'){
 
      root.style.setProperty('--cursorHand','auto'); 
      root.style.setProperty(`--articleZindex${this.state.moveElement}`,`0`);
 
      this.setState({
        moveElement: null,
        moveEnabled: false,
        showHelp: false
      })
      }
      //ON
      if(!this.state.moveEnabled && this.state.mode !== 'add' && this.state.mode !== 'select'){

      // if(e.type === 'touchstart'){
 
      //       onclick.call(this, e); 
      //       e.stopPropagation(); 
      //       e.preventDefault(); 
 
      // }
   
      this.setState({
        moveElement: handle,
        moveEnabled: true,
        showHelp: false
      })

      }

      //select post to edit
      if(this.state.mode === 'select'){
  
      this.setState({
        mode: 'edit',
        moveElement: null,
        moveEnabled: false,
        showAddArticle: true,
        showHelp: false,
        editElement: handle
      })
 
      //put add article form on top of current selection 
      root.style.setProperty(`--addArticleLeft`,root.style.getPropertyValue(`--articleLeft${handle}`));
      root.style.setProperty(`--addArticleTop`,root.style.getPropertyValue(`--articleTop${handle}`));
 
      }//end select
 
  }

  //moves whatever element is active
  moveEnabled(e){

    showEventType = e.type;

    e.preventDefault(); 
  
    //e.preventDefault();
 
    if(this.state.mode === 'ready' && this.state.moveEnabled){
      
      let Xadd;
      let Yadd;//(parseInt(this.state.moveElement) + 1) * 250;  
      let Xclient;
      let Yclient;

      //move post-its
      if(this.state.moveElement !== 'toolBox'){

        //Desktop
         
          Xadd = 80;

          //set custom hand cursor
          root.style.setProperty('--cursorHand',`url(${HandCursor}),auto`); 

          Yadd = 30;//(parseInt(this.state.moveElement) + 1) * 250;
          Xclient = e.clientX;
          Yclient = e.clientY;
 
          if(e.pageY > Yclient){

            Yclient = e.pageY;
 
          }

          root.style.setProperty(`--articleLeft${this.state.moveElement}`,`${Xclient - Xadd}px`);
          root.style.setProperty(`--articleTop${this.state.moveElement}`,`${Yclient - Yadd}px`);
 
        
        showTouchX = Xclient;
        showTouchY = Yclient;
 
        
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
        root.style.setProperty('--toolBoxLeft',`${Xclient - 14}px`);
        root.style.setProperty('--toolBoxTop',`${Yclient - 100}px`);
        
      }
 
    }
 
  }

  showHelp(){

    if(!this.state.showHelp){
 
      this.setState({

        showHelp: true

      })
    }
    else{
      this.setState({

        showHelp: false

      })
 
    }
 
  }

  //Mobile enlarges/shrinks note
  zoomPost(e,handle){
 
    //select when zoomed in... 
    if(this.state.mode === 'select'){
      this.setState({
        mode: 'edit',
        moveElement: null,
        moveEnabled: false,
        showAddArticle: true,
        showHelp: false,
        zoom: false,
        zoomElement: null,
        editElement: handle
      })
    }
  
    //not zoomed in... Ready mode
    if(!this.state.zoom && this.state.mode === 'ready'){

      let zoom = document.querySelector(`#note_${handle}`);
      let location = zoom.getBoundingClientRect();

      let scrolled = document.documentElement.scrollTop || document.body.scrollTop;
 
      //set start place for new article based on the default toolbox coords
      root.style.setProperty(`--zoom_Y_Location`,`${location.top + scrolled}px`);
 
      this.setState({
        mode: 'zoomed',
        zoom: true,
        zoomElement: handle
      })
    }
    //zoomed in... Zoomed mode
    else if(this.state.zoom && this.state.mode === 'zoomed'){

      //same article is selected closes zoom...
      if(handle === this.state.zoomElement){

        this.setState({
          mode: 'ready',
          zoom: false,
          zoomElement: null
        })
 
      }
      //Another article is selected, zoom into tjhat article...
      else{

        let zoom = document.querySelector(`#note_${handle}`);

        let location = zoom.getBoundingClientRect();

        let scrolled = document.documentElement.scrollTop || document.body.scrollTop;
  
        //set start place for new article based on the default toolbox coords
        root.style.setProperty(`--zoom_Y_Location`,`${location.top + scrolled}px`);
 
        this.setState({
          mode: 'zoomed',
          zoom: true,
          zoomElement: handle
        })
 
      }

      
    }
    
  }

  render(){

    //Var holder for the initial values...
    let theArticle;

    console.log('current mode= ',this.state.mode);
    console.log('current zoom= ',this.state.zoom);
    console.log('current editElement= ',this.state.editElement);
    
    //Populate form with exitsing information for EDIT mode or null for new...
    if(this.state.mode === 'edit'){

      //find article matching the articleId
      let handle = this.state.editElement;
      theArticle = this.props.articles.find((item) => item.articleId === handle);
 
    } 
    else {
      theArticle  = {
        articleId: null,
        title: null,
        content: null,
        author: null
      }
    }

    //Show help screen...


      //Desktop version
      if(!isMobile){
 
       const mainContent = 
        <React.Fragment> 
      <List 
        selectedArticle={this.state.moveElement} 
        clickToEnable={this.clickToEnable} 
        moveEnabled={this.moveEnabled}
        mobile={false}
      />
      {this.state.showAddArticle && 
      <AddArticleForm 
        onSubmit={this.submitForm}
        deleteForm={this.deleteForm}
        articleCount={this.props.articles.length}
        mode={this.state.mode}
        handle={this.state.editElement}
        articles={this.props.articles}
        initialValues={theArticle}
        mobile={false}
      />}
      <ToolBox 
        newArticle={this.newArticle}
        editArticle={this.editArticle} 
        clickToEnable={this.clickToEnable}
        showHelp={this.showHelp}
        mobile={false}
      />
      <div className='HeadlineContainer'>POST IT!
        <button className='helpButton' onClick={()=> this.showHelp()}>?</button>
      </div>
      {this.state.showHelp && <Help mobile={false}/>} 
      {/* touchX = {showTouchX}
        touchY = {showTouchY}
        showEventType = {showEventType} */}
       
      </React.Fragment>
 
        return(
       
          <div className='displayContainer' onMouseMove={(e)=>this.moveEnabled(e)}>
            {mainContent}
          </div>
     
        )
 
      }

      //Mobile version
      if(isMobile){

        const mainContent = 
        <React.Fragment> 
        <List
          selectedArticle={this.state.moveElement} 
          clickToZoom={this.zoomPost} 
          mobile={true}
        />
        {this.state.showAddArticle && 
        <AddArticleForm 
          className='mobile_AddContainer'
          onSubmit={this.submitForm}
          deleteForm={this.deleteForm}
          articleCount={this.props.articles.length}
          mode={this.state.mode}
          handle={this.state.moveElement}
          articles={this.props.articles}
          initialValues={theArticle}
          mobile={true}
        />}
         {this.state.zoom &&
          <ArticleZoom 
            clickToZoom={this.zoomPost}
            zoomElement={this.state.zoomElement}
            articles={this.props.articles}
          />}
        <ToolBox 
            newArticle={this.newArticle}
            editArticle={this.editArticle} 
            clickToEnable={this.clickToEnable}
            showHelp={this.showHelp}
            mobile={true}
          />
        <div className='mobile_HeadlineContainer'>
          POST IT!
        </div>
        <button className='mobile_helpButton' onClick={()=> this.showHelp()}>?</button>
        {this.state.showHelp && <Help mobile={true} />} 
        {/* touchX = {showTouchX}
          touchY = {showTouchY}
          showEventType = {showEventType} */}
      </React.Fragment>
 
        return(
          
          <React.Fragment>
          <div className='displayContainer'>
            {mainContent}
          </div>
          <div className='mobile_Stay'>
          
          </div>
          </React.Fragment>
           
        )
 
      }
  
  }
 
}
  
const mapStateToProps = (state) => {

  return {

    articles: state.randyReducer.articles

  };

};

export default connect(mapStateToProps)(Display);