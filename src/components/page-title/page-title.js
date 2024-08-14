import React from 'react';
import './page-title.scss';
import DOMPurify from 'dompurify';

export const PageTitle = (props) => {
  return (
    <section className='page-title'>
        <div className='container'>
            <h1>{props.title}</h1>
            {props.resumn && (
              <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.resumn) }}></p>
            )}
        </div>
    </section>
  );
};