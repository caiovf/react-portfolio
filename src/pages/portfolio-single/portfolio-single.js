import React, { useContext,useEffect } from 'react';
import './portfolio-single.scss';
import { useLocation } from 'react-router-dom';
import { DataContext } from '../../contexts/dataContext';
import { Button } from '../../components/button';
import DOMPurify from 'dompurify';

export const PortfolioSingle = (props) => {   
    const { getProjectBySlug, getCategoriesById } = useContext(DataContext);
    const location = useLocation();
    const type = location.state?.slug;
    const project = getProjectBySlug(type);        
    const projectCategories = getCategoriesById(project.categories);

    const cleanHtml = (text) => {
        return DOMPurify.sanitize(text, {
          ALLOWED_ATTR: ['href', 'target', 'rel'],           
        })
    };


    useEffect(() => {
        document.title = `${project.title} | Caio Ferreira Front End Developer`;
    }, [project.title]);

    return (
        <>
            <section className='single-banner'>
                <div className='container'>
                    {project.thumbnail && (
                        <div className='box-img'>
                            <img className='img-responsive' src={project.thumbnail} width="1440" height="826" alt={`Imagem do projeto ${project.title}`}></img>
                        </div>
                    )}
                    <div className='box-text'>
                        <h1>{project.title}</h1>
                        {project.description && (
                            <div className='resume'>
                                <p>{project.description}</p>
                            </div>
                        )}
                        {project.text && (
                            <div className='text'>
                                <p dangerouslySetInnerHTML={{ __html: cleanHtml(project.text) }}></p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <section className='tools-used'>
                <div className='container'>
                    <div className='section-header'>
                        <h2>Tools Used</h2>
                        {( project.link_project || project.link_github) && (
                            <div className='list-buttons'>
                                {project.link_project && (
                                    <Button
                                        className="invert-position"
                                        iconSrc="arrow-dg.svg"
                                        iconWidth="24"
                                        iconHeight="24"
                                        iconAlt="Arrow"
                                        label={project.current_online ? "View Project" : "Project Offline"}                            
                                        link={project.current_online ? project.link_project : '' }
                                    />
                                )}
                                {project.link_github && (                            
                                    <Button
                                        className="invert-position"
                                        iconSrc="arrow-dg.svg"
                                        iconWidth="24"
                                        iconHeight="24"
                                        iconAlt="Arrow"
                                        label="GitHub Code"                            
                                        link={project.link_github}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                    <div className='section-content'>
                        {projectCategories.map((item,index) => (
                            <Button
                                key={index}
                                iconSrc={`${item.slug}.png`}
                                iconWidth="24"
                                iconHeight="24"
                                iconAlt={`Icone ${item.slug}`}
                                label={item.name}                                
                                customColor={item.color}
                            />
                        ))}   
                    </div>
                </div>
            </section>
        </>
    );
};