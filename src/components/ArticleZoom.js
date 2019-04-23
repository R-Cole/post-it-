import React from 'react';

function ArticleZoom(props){

    let handle = props.zoomElement;
    console.log('handle = ',handle);
    console.log('articles = ',props.articles);
    let content = null;

    content = props.articles.map((item) =>{

      if(item.articleId === handle){
        return( 
        <div className='mobile_Zoom' key={handle} onClick={(e)=> props.clickToZoom(e,handle)} >   
            <span className='ArticleId'>
            #{item.articleId}
            </span>
            <span className='ArticleTitle'>{item.title}</span>
            <p className='ArticleContent'>{item.content}</p>
            <span className='ArticleBy'>posted by {item.author}</span>
        </div>
        )
      } 
      else return null

    });

    return content
      
}

export default ArticleZoom;