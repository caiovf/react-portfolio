import React, { memo } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import DOMPurify from 'dompurify';
import { Button } from '../../../button';
import './profile.scss';

export const Profile = memo((props) => {
    const title = props.title;
    const description = props.description;
    const image = props.image;

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
        <section className='profile'>
            <div className='container'>
                <div className='left-content'>
                    <h1 data-custom-title="banner" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(title) }}></h1>
                    <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}></p>
                    {/* <Button                        
                        iconSrc="download.svg"
                        iconWidth="24"
                        iconHeight="24"
                        iconAlt="Icone Download"
                        label="Download Resume"
                        link={data.resume}
                        download="true"
                    /> */}
                </div>
                <div className='right-content'>
                    <img className="img-responsive" src={image} width="682" height="682" alt="Foto de Caio Ferreira" />
                </div>
            </div>
        </section>
    );
});
