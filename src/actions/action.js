
//define action type variable -- a safegaurd
export const ADD_ARTICLE = 'ADD_ARTICLE';

//define action function
export function addArticle(payload){

  //send command (type) to reducer along with data(payload)
  return {

    type:'ADD_ARTICLE',
    payload: payload

  }

}