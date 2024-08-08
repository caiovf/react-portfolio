import React, { memo } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './skills.scss';
import { Button } from '../../../button';

export const Skills = memo((data) => {       
    data = data.data

    if (!data) {
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

    return (
        <section className='section-home skills'>
            <div className='container'>
                <div className='section-header'>
                    <h2 data-custom-title="section">My Skills</h2>
                </div>
                <div className='section-content'>
                    {data.map((item,index) => (
                        <Button
                            key={index}
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
});