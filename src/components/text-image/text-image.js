import React, { memo } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import DOMPurify from 'dompurify';
import './text-image.scss';

export const TextImage = memo((props) => {
    const title = props.title;
    const description = props.description;
    const image = props.img;
    const alternate = props.alternate ? props.alternate : false;

    if (!props) {
        return (
            <section className='profile'>
                <div className='container'>
                    <div className='left-content'>
                        <Skeleton height={70} width={700} count={2} />
                        <Skeleton height={35} width={600} count={4} />
                        <Skeleton height={60} width={230} count={1} />
                    </div>
                    <div className='right-content'>
                        <Skeleton height={682} width={682} count={1} borderRadius="500px" />
                    </div>
                </div>
            </section>
        );
    }    

    return (
        <section className='section-home text-image'>
            <div className='container'>
                <div className='left-content'>
                    <h2 data-custom-title="section" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(title) }}></h2>
                    <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}></p>
                </div>
                <div className='right-content'>
                    <img className="img-responsive" src={image} width="690" height="500" alt="Foto de Caio Ferreira" />
                </div>
            </div>
        </section>
    );
});
