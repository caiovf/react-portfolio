import React, { useContext } from 'react';
import './list.scss';
import { Button } from '../../../button';
import { CardPortfolio } from '../../../card-portfolio';
import { DataContext } from '../../../../contexts/dataContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const List = (props) => {
    const { state } = useContext(DataContext);
  
    let portfolioData = state.projectsData.portfolio;
    
    let AllSkills = state.skillsData.filter(skill => 
        portfolioData.some(project => project.categories.includes(skill.id))
    );

    const getPortraitValue = (index) => {
        const sequence = [0, 1, 1];
        return sequence[(index % sequence.length)] === 0 ? '' : 'portrait';
    };

    return (
        <section className='list-portfolio'>
            <div className='container'>
                <div className='section-header'>
                    <h2>Filter By</h2>
                    <div className='list-buttons'>
                        <Button
                            iconSrc="filter.svg"
                            iconWidth="24"
                            iconHeight="24"
                            iconAlt={`Icone para remover a filtragem}`}
                        />
                        {!AllSkills ? (
                            <>
                                <Skeleton height={56} width={123} count={1} borderRadius="45px" />
                                <Skeleton height={56} width={123} count={1} borderRadius="45px" />
                                <Skeleton height={56} width={123} count={1} borderRadius="45px" />
                                <Skeleton height={56} width={123} count={1} borderRadius="45px" />
                                <Skeleton height={56} width={123} count={1} borderRadius="45px" />
                                <Skeleton height={56} width={123} count={1} borderRadius="45px" />
                                <Skeleton height={56} width={123} count={1} borderRadius="45px" />
                                <Skeleton height={56} width={123} count={1} borderRadius="45px" />
                                <Skeleton height={56} width={123} count={1} borderRadius="45px" />
                            </>
                        ) : (
                            AllSkills.map((item,index) => (
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
                            ))
                        )}                        
                    </div>
                </div>
                <div className='section-content'>
                    {portfolioData.map((item,index) => (
                        <CardPortfolio 
                            key={index}
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
            </div>
        </section>
    );
};