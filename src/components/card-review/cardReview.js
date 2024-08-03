import React from 'react';
import './cardReview.scss';

export const CardReview = (props) => {           
    
    return (
        <article className="card-review" title={props.title} >
            <div className='box-text'>
                <p>Caio atendeu todas as minhas expectativas, tanto na execução e suporte no projeto final, excelente profissional, criou um painel que facilitou a gestão do site. Caio atendeu todas as minhas expectativas, tanto na execução e suporte no projeto final, excelente profissional, criou um painel que facilitou a gestão do site.</p>
            </div>
            <div className='author-info'>
                <h3>Miogx <small>• Miguel Melo</small></h3>
            </div>
        </article>
        
    );
};