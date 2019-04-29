//import action
import { ADD_ARTICLE, EDIT_ARTICLE, DELETE_ARTICLE } from '../actions/action';

//set initial state
const initialState = {

  articles: []

};

//reducer function
function randyReducer(state = initialState, action) {

  //concat adds payload data to the existing state
  //const newArticles = state.articles.concat(action.payload);

  const newArticles = action.payload;

  //Add article to articles array
  if(action.type === ADD_ARTICLE){
 
    //Object assign creates a new object to avoid object mutation
    return Object.assign({}, state, {

      articles: [...state.articles, newArticles] 
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
  
    return Object.assign({}, state, {

      articles: newArticles
 
    });


  }

  //DELETE article by handle
  if(action.type === DELETE_ARTICLE){
  
    const newArticles = state.articles.filter(item => item.articleId !== action.handle);
  
    return Object.assign({}, state, {

      articles: newArticles

    })


  }  

  
  //if no action command is matched then just return the existing state
  else return state;
}

//export the reducer
export default randyReducer;