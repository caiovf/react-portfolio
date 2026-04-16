import React from 'react';
import './cardReview.scss';

export const CardReview = (props) => {           
    const { text, title, author } = props.data || {};
    
    return (
        <article className="card-review" title={title} >
            <div className='box-text'>
                <p dangerouslySetInnerHTML={{ __html: text }}></p>
            </div>
            <div className='author-info'>
                <h3>{title} <small>• {author}</small></h3>
            </div>
        </article>
    );
};