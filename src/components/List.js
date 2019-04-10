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
      ? 'No Posts Yet...'
      : this.props.articles.map((item,index) => {

        let handle = item.articleId;

        posStyle[handle] = {
          position: 'absolute',
          top: `var(--articleTop${handle})`,
          left: `var(--articleLeft${handle})`,
          zIndex: `var(--articleZindex${handle})`
        }
   
        return (
        
        <li 
          style={posStyle[handle]}
          key= {handle} 
          className='Article'
          onTouchStart={(e)=>this.props.clickToEnable(e,handle)}
          onClick={(e)=>this.props.clickToEnable(e,handle)}>
          <span className='ArticleId'>
            #{item.articleId}
          </span>
           <div>
            <span className='ArticleTitle'>{item.title}</span>
            <p className='ArticleContent'>{item.content}</p>
            <span className='ArticleBy'>posted by {item.author}</span>
          </div>
        </li>
       
        )
       
      });

// onTouchMove={(e)=>this.moveEnabled(e)} onMouseMove={(e)=>this.props.moveEnabled(e)} 

      return (
        <div> 
          <ul className='ArticleContainer'>
            {theArticleList}
          </ul>
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

 