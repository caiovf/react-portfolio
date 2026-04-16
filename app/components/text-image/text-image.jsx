import React, { memo } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { sanitizeHtml } from '@/utils/sanitize';
import './text-image.scss';

export const TextImage = memo((props) => {
    const title = props.title;
    const description = props.description;
    const alternate = props.alternate ? props.alternate : false;
    const image = props.img;
    const imageWidth = props.imgWidth ? props.imgWidth : 690;
    const imageHeight = props.imgHeight ? props.imgHeight : 500;
    const imgAlt = props.imgAlt ? props.imgAlt : '';
    const sectionClasses = `section-home text-image${alternate ? ' alternate' : ''}`;

    if (!title && !description) {
        return (
            <section className='section-home text-image'>
                <div className='container'>
                    <div className='left-content'>
                        <Skeleton height={70} width={300} count={1} />
                        <Skeleton height={20} width={500} count={3} />
                        <Skeleton height={48} width={200} count={1} borderRadius="45px" />
                    </div>
                    <div className='right-content'>
                        <Skeleton height={imageWidth} width={imageHeight} count={1} borderRadius="500px" />
                    </div>
                </div>
            </section>
        );
    }    

    return (
        <section className={sectionClasses}>
            <div className='container'>
                <div className='left-content'>
                    <h2 data-custom-title="section" dangerouslySetInnerHTML={{ __html: sanitizeHtml(title) }}></h2>
                    <p dangerouslySetInnerHTML={{ __html: sanitizeHtml(description) }}></p>
                </div>
                <div className='right-content'>
                    <img className="img-responsive" src={image} width={imageWidth} height={imageHeight} alt={imgAlt} />
                </div>
            </div>
        </section>
    );
});
