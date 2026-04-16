import React from 'react';
import './page-title.scss';
import { sanitizeHtml } from '@/utils/sanitize';


export const PageTitle = (props) => {
  
  const cleanHtml = (text) => {
    return sanitizeHtml(text, {
      ALLOWED_ATTR: ['href', 'target', 'rel']      
    })
  };

  return (
    <section className='page-title'>
        <div className='container'>
            <h1 dangerouslySetInnerHTML={{ __html: cleanHtml(props.title) }}></h1>
            {props.resumn && (
              <p dangerouslySetInnerHTML={{ __html: cleanHtml(props.resumn) }}></p>
            )}
        </div>
    </section>
  );
};