import React from 'react';
import './page-title.scss';
import DOMPurify from 'dompurify';


export const PageTitle = (props) => {
  
  const cleanHtml = (text) => {
    return DOMPurify.sanitize(text, {
      ALLOWED_ATTR: ['href', 'target', 'rel']      
    })
  };

  return (
    <section className='page-title'>
        <div className='container'>
            <h1>{props.title}</h1>
            {props.resumn && (
              <p dangerouslySetInnerHTML={{ __html: cleanHtml(props.resumn) }}></p>
            )}
        </div>
    </section>
  );
};