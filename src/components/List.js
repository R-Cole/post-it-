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

      let m_ListContainer='ListContainer';
 
      const theArticleList = this.props.articles.length === 0
      ? 'No Posts Yet...'
      : this.props.articles.map((item,index) => {

        let handle = item.articleId;
        let listContent = null;  
 
        //is Desktop 
        if(!this.props.mobile){

          posStyle[handle] = {
            position: 'absolute',
            top: `var(--articleTop${handle})`,
            left: `var(--articleLeft${handle})`,
            zIndex: `var(--articleZindex${handle})`
          }
   
          listContent =
        
          <li 
            style={posStyle[handle]}
            key= {handle} 
            className='Article'
            onClick={(e)=>this.props.clickToEnable(e,handle)}
          >
          <span className='ArticleId'>
            #{item.articleId}
          </span>
           <div>
            <span className='ArticleTitle'>{item.title}</span>
            <p className='ArticleContent'>{item.content}</p>
            <span className='ArticleBy'>posted by {item.author}</span>
          </div>
          </li>
        
        } 
      
        //is Mobile 
        if(this.props.mobile){

          m_ListContainer='mobile_ListContainer' 

          // posStyle[handle] = {
          //   position: 'absolute',
          //   top: `var(--articleTop${handle})`,
          //   left: `var(--articleLeft${handle})`,
          //   zIndex: `var(--articleZindex${handle})`
          // }
   
          listContent =
        
          <li 
            // style={posStyle[handle]}
            key={index} 
            id={`note_${handle}`}
            className='mobile_Article'
            onClick={(e)=>this.props.clickToZoom(e,handle)}
          >
          <span className='mobile_ArticleId'>
            #{item.articleId}
          </span>
           <div>
            <span className='mobile_ArticleTitle'>{item.title}</span>
            {/* <p className='ArticleContent'>{item.content}</p> */}
            <span className='mobile_ArticleBy'>posted by {item.author}</span>
          </div>
          </li>
        
        } 

      return (
         
        listContent
         
      )
        
       
      });

// onTouchMove={(e)=>this.moveEnabled(e)} onMouseMove={(e)=>this.props.moveEnabled(e)} 

      return (
        <div> 
          <ul className={m_ListContainer}>
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

 