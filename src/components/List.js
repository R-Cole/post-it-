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
        
        <li 
          style={posStyle[index]}
          key= {index} 
          className='Article' 
          onClick={(e)=>this.props.clickToEnable(e,handle)}>
          <span className='ArticleCount'>
            #{item.articleCount}
          </span>
           <div>
            <span className='ArticleTitle'>{item.title}</span>
            <br className='smallLineBreak'></br>
            <p className='ArticleContent'>{item.content}</p>
            <br className='smallLineBreak'></br>  
            <span className='ArticleBy'>posted by {item.author}</span>
          </div>
        </li>
       
        )
       
      });

      return (
        <div onMouseMove={(e)=>this.props.moveEnabled(e)} > 
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

 