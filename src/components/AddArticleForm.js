import React from 'react';
import { reduxForm, Field } from 'redux-form';
 
export function AddArticleForm (props) {
  
    return (
      <React.Fragment>
      <form className='AddArticleContainer' onSubmit={props.handleSubmit}>
        <div>
          <label className='formHL' htmlFor='title'>Title: </label><br/>
          <Field 
            className='titleInput'
            name='title'
            component='input'
            type='text'
          />
        </div>
        <div>
          <label className='formHL' htmlFor='content'>Content: </label><br/>
          <Field
            className='contentInput'
            name='content'
            component='textarea'
            rows="6"
            cols="26"
            type='text'
          />
        </div>
        <div >
          <label className='formHL' htmlFor='author'>Author: </label><br/>
          <Field
            className='authorInput'
            name='author'
            component='input'
            type='text'
          />
        </div>
        <button className='button' type='submit'>SAVE</button>
      </form>
      </React.Fragment>
 
    )
   
}
 
export default reduxForm({form: 'addArticle'})(AddArticleForm);