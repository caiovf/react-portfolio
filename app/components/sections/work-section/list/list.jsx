import React, { useState, useEffect, lazy, Suspense } from 'react';
import './list.scss';
import { Button } from '../../../button';
import { CardPortfolio } from '../../../card-work';

const Skeleton = lazy(() =>
    import('react-loading-skeleton').then(mod => {
        import('react-loading-skeleton/dist/skeleton.css');
        return mod;
    })
);

export const List = (props) => {    
    const AllSkills = props.skills;
    const categoryFilter = props.categoryFilter;
    const [selectedSkill, setSelectedSkill] = useState();
    const [filteredPortfolio, setFilteredPortfolio] = useState();

    const getPortraitValue = (index) => {
        const sequence = [0, 1, 1];
        return sequence[(index % sequence.length)] === 0 ? '' : 'portrait';
    };

    const setFilter = (skillId) => {      
        if (skillId) {
            const filtered = props.projects.filter(project => 
                project.categories.includes(skillId)
            );
            setFilteredPortfolio(filtered);
        } else {
            setFilteredPortfolio(props.projects);
        }
        setSelectedSkill(skillId);
    };

    useEffect(() => {

        setSelectedSkill(null);
        setFilteredPortfolio(props.projects);        

        if (categoryFilter) {
            const filtered = props.projects.filter(project => 
                project.categories.includes(categoryFilter)
            );
            setFilteredPortfolio(filtered);
        }  
        
    }, [props.projects,categoryFilter]);
    
    return (
        <section className='list-portfolio'>
            <div className='container'>
                {!categoryFilter && (
                    <div className='section-header'>
                        <h2>Filter By</h2>
                        <div className='list-buttons'>
                            {selectedSkill && (
                                <Button
                                    iconSrc="filter.svg"
                                    iconWidth="24"
                                    iconHeight="24"
                                    iconAlt={`Icone para remover a filtragem}`}
                                    onClick={() => setFilter(null)}
                                />
                            )}
                            {!AllSkills ? (
                                <Suspense fallback={<div style={{height: 56}} />}>
                                    <Skeleton height={56} width={123} count={1} borderRadius="45px" />
                                    <Skeleton height={56} width={123} count={1} borderRadius="45px" />
                                    <Skeleton height={56} width={123} count={1} borderRadius="45px" />
                                    <Skeleton height={56} width={123} count={1} borderRadius="45px" />
                                    <Skeleton height={56} width={123} count={1} borderRadius="45px" />
                                    <Skeleton height={56} width={123} count={1} borderRadius="45px" />
                                    <Skeleton height={56} width={123} count={1} borderRadius="45px" />
                                    <Skeleton height={56} width={123} count={1} borderRadius="45px" />
                                    <Skeleton height={56} width={123} count={1} borderRadius="45px" />
                                </Suspense>
                            ) : (
                                AllSkills.map((item,index) => (
                                    <Button
                                        key={index}
                                        iconSrc={`${item.slug}.png`}
                                        iconWidth="24"
                                        iconHeight="24"
                                        iconAlt={`Icone ${item.slug}`}
                                        label={item.name}
                                        customColor={item.color}
                                        onClick={() => setFilter(item.id)}
                                        className={selectedSkill === item.id ? 'active' : ''}
                                    />
                                ))
                            )}                        
                        </div>
                    </div>
                )}
                <div className='section-content'>
                    {!filteredPortfolio ? (
                        <Suspense fallback={<div style={{height: 529}} />}>
                            <Skeleton height={529} width={922} count={1} borderRadius="16px" />
                            <Skeleton height={529} width={494} count={1} borderRadius="16px" />
                        </Suspense>
                    ) : (
                        filteredPortfolio.map((item,index) => (
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
                                basePath={props.basePath}
                            />
                        ))
                    )}                    
                </div>
            </div>
        </section>
    );
};