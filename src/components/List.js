import React from 'react';
import { connect } from 'react-redux';
const posStyle = [];
 
export class List extends React.Component {
 
    constructor(props) {
      super(props);

      this.state = {
        
      }

    }
  
 
      
    render() {
 
      const theArticleList = this.props.articles.length === 0
      ? 'No Articles Yet...'
      : this.props.articles.map((item,index) => {

        let handle = index;
        posStyle[index] = {

          position: 'absolute',
          top: `var(--articleTop${index})`,
          left: `var(--articleLeft${index})`,
          zIndex: `var(--articleZindex${index})`
        }
   
        return (
        
        <div 
          style={posStyle[index]}
          key= {index} 
          className='Article' 
          onClick={(e)=>this.props.clickToEnable(e,handle)}>
          <span className='ArticleCount'>POST #{item.articleCount}</span>
          <h4>{item.title}</h4>
          <p>{item.content}</p>
          <p>Written by: {item.author}</p>
        </div>
       
        )
       
      });

      return (
        <div onMouseMove={(e)=>this.props.moveEnabled(e)} >
         
        <div className='ArticleContainer'>
          {theArticleList}
        </div>
        </div>
        );

    }
 
}


const mapStateToProps = state => {

  return {

    articles: state.randyReducer.articles 

  };

};
 
export default connect(mapStateToProps)(List); //alternate streamlined way

 