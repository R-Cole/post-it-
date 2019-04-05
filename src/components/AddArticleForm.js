import React from 'react';
import { reduxForm, Field } from 'redux-form';
 
export function AddArticleForm (props) {
  
    return (
      <React.Fragment>
      <form className='AddArticleContainer' onSubmit={props.handleSubmit}>
        <div>
          <label htmlFor='title'>Title: </label>
          <Field 
            name='title'
            component='input'
            type='text'
          />
        </div>
        <div>
          <label htmlFor='content'>Content: </label>
          <Field
            name='content'
            component='input'
            type='text'
          />
        </div>
        <div>
          <label htmlFor='author'>Author: </label>
          <Field
            name='author'
            component='input'
            type='text'
          />
        </div>
        <button type='submit'>SAVE</button>
      </form>
      </React.Fragment>
 
    )
   
}
 
export default reduxForm({form: 'addArticle'})(AddArticleForm);