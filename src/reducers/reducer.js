//import action
import { ADD_ARTICLE } from '../actions/action';

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
 
  
  //if no action command is matched then just return the existing state
  else return state;
}

//export the reducer
export default randyReducer;