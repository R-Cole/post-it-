import React from 'react';
import { reduxForm, Field } from 'redux-form';
 
export class AddArticleForm extends React.Component{

  render(){
 
    return (
      <React.Fragment>
      <form className='AddArticleContainer' onSubmit={this.props.handleSubmit} >
        <div>
          <label className='formHL' htmlFor='title'></label><br/>
          <Field 
            className='titleInput'
            name='title'
            component='input'
            type='text'
            placeholder='Title...'
            maxLength='19'
          />
        </div>
        <div>
          <label className='formHL' htmlFor='content'></label><br/>
          <Field
            className='contentInput'
            name='content'
            component='textarea'
            rows="6"
            cols="26"
            type='text'
            placeholder='Content...'
            maxLength='200'
             
          />
        </div>
        <div >
          <label className='formHL' htmlFor='author'></label><br/>
          <Field
            className='authorInput'
            name='author'
            component='input'
            type='text'
            placeholder='Author...'
            maxLength='30'
          />
        </div>
        <button className='submitFormButton' type='submit'>SAVE</button>
        <button onClick={()=>this.props.deleteForm()} className='deleteFormButton' type='delete'>DELETE</button>
      </form>
      </React.Fragment>
 
    )
    }
}
 
export default reduxForm({form: 'addArticle'})(AddArticleForm);