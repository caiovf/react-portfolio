import React, { useEffect, useState, memo, useRef } from 'react';
import { fetchData } from '../../../../api/api';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import DOMPurify from 'dompurify';
import { Button } from '../../../button';
import './profile.scss';

export const Profile = memo((props) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const useEffectExecuted = useRef(false);

    useEffect(() => {
        if(useEffectExecuted.current){
            return;
        }
        setLoading(true);
        setError(null);
    
        fetchData('about')
        .then((response) => {            
            setData(response.data);
        })
        .catch((err) => {            
            setError('Error fetching data')
        })
        .finally(() => {
            setLoading(false)
        });        
        useEffectExecuted.current = true
    }, [])

    if (loading) {
        return (
            <section className='profile'>
                <div className='container'>
                    <div className='left-content'>
                        <Skeleton height={70} width={700} count={2} />
                        <Skeleton height={35} width={600} count={4} />
                        <Skeleton height={60} width={230} count={1} />
                    </div>
                    <div className='right-content'>
                        <Skeleton height={682} width={682} count={1} borderRadius="250px" />
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        console.error(`Erro no componente profile: ${error}`)
    }

    return (
        <section className='profile'>
            <div className='container'>
                <div className='left-content'>
                    <h1 data-custom-title="banner" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.title) }}></h1>
                    <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.description) }}></p>
                    <Button                        
                        iconSrc="download.svg"
                        iconWidth="24"
                        iconHeight="24"
                        iconAlt="Icone Download"
                        label="Download Resume"
                        link={data.resume}
                        download="true"
                    />
                </div>
                <div className='right-content'>
                    <img className="img-responsive" src={data.image} width="682" height="682" alt="Foto de Caio Ferreira" />
                </div>
            </div>
        </section>
    );
});
