//import action
import { ADD_ARTICLE, EDIT_ARTICLE, DELETE_ARTICLE } from '../actions/action';

//set initial state
const initialState = {

  articles: []

};

//reducer function
function randyReducer(state = initialState, action) {

  const newArticles = state.articles.concat(action.payload);

  //Add article to articles array
  if(action.type === ADD_ARTICLE){
 
    //Object assign creates a new object to avoid object mutation
    return Object.assign({}, state, {

      articles: newArticles //concat adds payload data to the existing state
 
    });
 
  }
 
  //REPLACE article with edited article
  if(action.type === EDIT_ARTICLE){

    const newArticles = state.articles.map((item) => {

      if(item.articleId === action.handle){

        return action.payload

      }

      else return item;
    
    });

    console.log('newArticles ',newArticles);
 
    return Object.assign({}, state, {

      articles: newArticles
 
    });


  }

  //DELETE article by handle
  if(action.type === DELETE_ARTICLE){

    console.log('index? ',action.handle);

    const newArticles = state.articles.filter(item => item.articleId !== action.handle);
 
    console.log('old Articles ',state.articles);
    console.log('new Articles ',newArticles);

    return Object.assign({}, state, {

      articles: newArticles

    })


  }  

  
  //if no action command is matched then just return the existing state
  else return state;
}

//export the reducer
export default randyReducer;