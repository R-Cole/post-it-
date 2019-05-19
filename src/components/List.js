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

          let color;
 
          if(item.color === 'yellow'){
            color = `rgb(250, 242, 198),rgb(250, 228, 102)`;
          }

          if(item.color === 'blue'){
            color = `rgb(198, 233, 250),rgb(102, 203, 250)`;
          }

          if(item.color === 'green'){
            color = `rgb(197, 250, 136),rgb(174, 255, 81)`;
          }

          if(item.color === 'pink'){
            color = `rgb(255, 196, 255),rgb(250, 145, 250)`;
          }

          posStyle[handle] = {
            position: 'absolute',
            top: `var(--articleTop${handle})`,
            left: `var(--articleLeft${handle})`,
            zIndex: `var(--articleZindex${handle})`,
            backgroundImage: `linear-gradient(${color})`
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
          {/* <span className='mobile_ArticleId'>
            #{item.articleId}
          </span> */}
          <div>
            <span className='mobile_ArticleTitle'>{item.title}</span>
            {/* <p className='ArticleContent'>{item.content}</p> */}
            {/* <span className='mobile_ArticleBy'>posted by {item.author}</span> */}
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

 