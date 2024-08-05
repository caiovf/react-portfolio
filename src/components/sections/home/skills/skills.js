import React, {useEffect, useState} from 'react';
import { fetchData } from '../../../../api/api';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './skills.scss';
import { Button } from '../../../button';

export const Skills = (props) => {       
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData('categories')
        .then(response => {
            setData(response.data);
            setLoading(false);
        })
        .catch(error => {
            setError(error);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <section className='section-home skills'>
                <div className='container'>
                    <div className='section-header'>
                        <Skeleton height={62} width={200} count={1} />
                    </div>
                    <div className='section-content'>                
                        <Skeleton height={56} width={123} count={7} />
                    </div>
                </div>
            </section>
        );
    }

    if (error) return console.error('erro no componente skills');

    return (
        <section className='section-home skills'>
            <div className='container'>
                <div className='section-header'>
                    <h2 data-custom-title="section">My Skills</h2>
                </div>
                <div className='section-content'>
                    {data.map(item => (
                        <Button
                            iconSrc={`${item.slug}.png`}
                            iconWidth="24"
                            iconHeight="24"
                            iconAlt={`Icone ${item.slug}`}
                            label={item.name}
                            navigate="/portfolio"
                            value={item.slug}
                            customColor={item.color}
                        />
                    ))}                
                </div>
            </div>
        </section>    
    );
};