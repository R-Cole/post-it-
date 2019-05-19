import React from 'react';
import { reduxForm, Field } from 'redux-form';
 
export class AddArticleForm extends React.Component{

  constructor(props){
    super(props);

    this.state = {

      titleInput: null,
      contentInput: null,
      authorInput: null,
      colorInput: 'yellow'
 
    }
 
  }

  handleChange(event){
 
    //Title
    if(event.currentTarget.name === 'title'){

      this.setState({

        titleInput: event.currentTarget.value

      });
 
    };

    //Content
    if(event.currentTarget.name === 'content'){

      this.setState({

        contentInput: event.currentTarget.value

      });
 
    };

    //Author
    if(event.currentTarget.name === 'author'){

      this.setState({

        authorInput: event.currentTarget.value

      });
 
    };

    //Color
    if(
      event.currentTarget.name === 'color'){

      this.setState({

        colorInput: event.currentTarget.value

      });
 
    };
 
  }
 
  render(){

    let m_AddArticleContainer = 'AddArticleContainer';
    let m_submitFormButton = 'submitFormButton';
    let m_deleteFormButton ='deleteFormButton';
    let m_contentInput ='contentInput';


    if(this.props.mobile){

      //use mobile classes
      m_AddArticleContainer = 'mobile_AddArticleContainer';
      m_submitFormButton = 'mobile_submitFormButton';
      m_deleteFormButton ='mobile_deleteFormButton';
      m_contentInput ='mobile_contentInput';
    }
 
    return (
      <React.Fragment>
      <form className={m_AddArticleContainer} onSubmit={this.props.handleSubmit} >
        
        {!this.props.mobile
        ? <div>
          <label className='formHL' htmlFor='color'>
          <Field
            name='color'
            component='input'
            type='radio'
            value='yellow'
            onChange={(e) => this.handleChange(e)}
          >
          </Field>
            Yellow
          </label>
          <label className='formHL' htmlFor='color'>
          <Field
            name='color'
            component='input'
            type='radio'
            value='blue'
            onChange={(e) => this.handleChange(e)}
          >
          </Field>
            Blue
          </label>
          <label className='formHL' htmlFor='color'>
          <Field
            name='color'
            component='input'
            type='radio'
            value='green'
            onChange={(e) => this.handleChange(e)}
          >
          </Field>
            Green 
          </label>
          <label className='formHL' htmlFor='color'>
          <Field
            name='color'
            component='input'
            type='radio'
            value='pink'
            onChange={(e) => this.handleChange(e)}
          >
          </Field>
            Pink
          </label>
        </div>
      : null}
        
        <div>
          <label className='formHL' htmlFor='title'></label><br/>
          <Field 
            className='titleInput'
            name='title'
            component='input'
            type='text'
            placeholder='Title...'
            maxLength='19'
            onChange={(e) => this.handleChange(e)}
            value = {this.state.titleInput}
          />
        </div>
        <div>
          <label className='formHL' htmlFor='content'></label><br/>
          <Field
            className={m_contentInput}
            name='content'
            component='textarea'
            rows="6"
            cols="26"
            type='text'
            placeholder='Content...'
            maxLength='200'
            onChange={(e) => this.handleChange(e)}
            value = {this.state.contentInput}
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
            onChange={(e) => this.handleChange(e)}
            value = {this.state.authorInput}
          />
        </div>
        <div>
          <button className={m_submitFormButton} type='submit'>SAVE</button>
          <button onClick={()=>this.props.deleteForm()} className={m_deleteFormButton} type='delete'>DELETE</button>
        </div> 
      </form>
      </React.Fragment>
 
    )
    }
}
 
export default reduxForm({form: 'addArticle'})(AddArticleForm);