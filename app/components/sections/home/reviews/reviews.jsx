import React, { memo } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { CardReview } from '../../../card-review';
import { ClientOnly } from '../../../client-only';
import { ReviewsSlider } from './reviews-slider';

import './reviews.scss';

export const Reviews = memo((props) => {          
    const listReviews = props.data;
    const title = props.titulo ? props.titulo : '';

    // Se não houver dados E não houver título, mostra o esqueleto completo da seção
    if (!listReviews && !title) {
        return (
            <section className='section-home reviews'>
                <div className='container'>
                    <div className='section-header'>
                        <Skeleton height={62} width={200} count={1} />
                    </div>
                </div>
                <div className='section-content'>                
                    <Skeleton height={205} width={732} count={1} borderRadius="16px" />
                </div>                
            </section>  
        );
    }
    
    return (
        <section className='section-home reviews'>
            <div className='container'>
                <div className='section-header'>
                    <h2 data-custom-title="section">{title}</h2>                    
                </div>
            </div>
            
            <div className='section-content'>
                <ClientOnly fallback={
                    <div className="swiper-skeleton-wrapper">
                        {listReviews && listReviews.length > 0 ? (
                            <div className="static-reviews-list">
                                <CardReview data={listReviews[0]} />
                                {listReviews.length > 1 && <Skeleton height={205} width={732} count={1} borderRadius="16px" />}
                                <div style={{ fontSize: '10px', color: '#666', marginTop: '10px' }}>
                                    Status: Aguardando JS... (SSR Fallback)
                                </div>
                            </div>
                        ) : (
                            <Skeleton height={205} width={732} count={1} borderRadius="16px" />
                        )}
                    </div>
                }>
                    {listReviews && listReviews.length > 0 ? (
                        <ReviewsSlider listReviews={listReviews} />
                    ) : (
                         <div className='no-reviews-message'>No reviews found.</div>
                    )}
                </ClientOnly>
            </div>
        </section>    
    );
})