
//ADD article
export const ADD_ARTICLE = 'ADD_ARTICLE';

export function addArticle(payload){
 
  return {

    type:'ADD_ARTICLE',
    payload: payload

  }

}

//EDIT article
export const EDIT_ARTICLE = 'EDIT_ARTICLE';

export function editArticle(payload,handle){

  return {

    type: 'EDIT_ARTICLE',
    payload: payload,
    handle: handle
 
  }
 
}

//DELETE article
export const DELETE_ARTICLE = 'DELETE_ARTICLE';

export function deleteArticle(handle){

  return {

    type: DELETE_ARTICLE,
    handle: handle
  }


}