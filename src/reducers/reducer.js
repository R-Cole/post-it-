//import action
import { ADD_ARTICLE, EDIT_ARTICLE } from '../actions/action';

//set initial state
const initialState = {

  articles: []

};

//reducer function
function randyReducer(state = initialState, action) {

  //Add article to articles array
  if(action.type === ADD_ARTICLE){
 
    //Object assign creates a new object to avoid object mutation
    return Object.assign({}, state, {

      articles: state.articles.concat(action.payload) //concat adds payload data to the existing state
 
    });
 
  }
 
  //REPLACE article with edited article
  if(action.type === EDIT_ARTICLE){

    const newArticles = state.articles.map((item,index)=>{

      if(index === action.handle){

        return action.payload

      }

      else return item;
    
    });

    console.log('newArticles ',newArticles);
 
    return Object.assign({}, state, {

      articles: newArticles
 
    });


  }
  
  //if no action command is matched then just return the existing state
  else return state;
}

//export the reducer
export default randyReducer;