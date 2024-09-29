import React from 'react';
import './portfolio.scss';
import { Button } from '../../../button';
import Skeleton from 'react-loading-skeleton';
import { CardPortfolio } from '../../../card-portfolio';

export const SectionPortfolio = (props) => {       
    const data = props.data
    const type = props.type ? props.type : 'portfolio'

    if (!data) {
        return (
            <section className='section-home portfolio'>
            <div className='container'>
                <div className='section-header'>
                    <Skeleton height={62} width={200} count={1} />
                    <Skeleton height={62} width={236} count={1} borderRadius="45px" />                    
                </div>
                <div className='section-content'>   
                    <Skeleton height={529} width={922} count={1} borderRadius="16px" />
                    <Skeleton height={529} width={494} count={1} borderRadius="16px" />
                </div>                
            </div>
        </section>  
        );
    }      

    const getPortraitValue = (index) => {
        const sequence = [0, 1, 1];
        return sequence[(index % sequence.length)] === 0 ? '' : 'portrait';
    };
    
    return (
        <section className='section-home portfolio'>
            <div className='container'>
                <div className='section-header'>
                    <h2 data-custom-title="section">{props.titulo}</h2>
                    <Button
                        className="invert-position"
                        iconSrc="arrow.svg"
                        iconWidth="24"
                        iconHeight="24"
                        iconAlt="Arrow"
                        label="View More Projects"
                        navigate={`/${type}`}
                        value={type}
                    />
                </div>
                <div className='section-content'>
                    {data.map((item,index) => (
                        <CardPortfolio 
                            key={index}
                            ID={item.id}
                            imgSrc={item.thumbnail}
                            imgWidth={getPortraitValue(index) ? 922 : 494}
                            imgHeight="529"
                            imgAlt={`Imagem do projeto ${item.title}`}
                            title={item.title}
                            description={item.description}
                            categories={item.categories}
                            slug={item.slug}
                            className={getPortraitValue(index)}
                        />
                    ))}
                </div>
                <div className='section-footer'>
                    <Button
                        className="invert-position"
                        iconSrc="arrow.svg"
                        iconWidth="24"
                        iconHeight="24"
                        iconAlt="Arrow"
                        label="View More Projects"
                        navigate={`/${type}`}
                        value={type}
                    />
                </div>
            </div>
        </section>    
    );
};