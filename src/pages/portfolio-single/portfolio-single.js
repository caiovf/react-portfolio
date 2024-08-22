import React, { useContext,useEffect } from 'react';
import './portfolio-single.scss';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../contexts/dataContext';
import { Button } from '../../components/button';
import { CardReview } from '../../components/card-review';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import DOMPurify from 'dompurify';

export const PortfolioSingle = (props) => {   
    const { getProjectBySlug, getCategoriesById, getReviewsByProjectId } = useContext(DataContext);
    const { slug } = useParams();
    const project = getProjectBySlug(slug);
        
    const {
        id: projectId = '',
        title: projectTitle = '',
        thumbnail: projectThumbnail = '',
        description: projectDescription = '',
        text: projectText = '',
        link_project: projectLink = '',
        link_github: projectGithub = '',
        categories: projectCategoriesIds = []
    } = project || {};
    
    const projectCategories = getCategoriesById(projectCategoriesIds);
    const projectReviews = project ? getReviewsByProjectId(projectId) : [];

    const cleanHtml = (text) => {
        return DOMPurify.sanitize(text, {
          ALLOWED_ATTR: ['href', 'target', 'rel'],           
        })
    };
    
    useEffect(() => {
        if (projectTitle) {
            document.title = `${projectTitle} | Caio Ferreira Front End Developer`;
        }
        
    }, [projectTitle]);

    return (
        <>
            <section className='single-banner'>
                <div className='container'>
                    {projectThumbnail && (
                        <div className='box-img'>
                            <img className='img-responsive' src={projectThumbnail} width="1440" height="826" alt={`Imagem do projeto ${projectTitle}`}></img>
                        </div>
                    )}
                    <div className='box-text'>
                        <h1>{projectTitle}</h1>
                        {projectDescription && (
                            <div className='resume'>
                                <p>{projectDescription}</p>
                            </div>
                        )}
                        {projectText && (
                            <div className='text'>
                                <p dangerouslySetInnerHTML={{ __html: cleanHtml(projectText) }}></p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <section className='tools-used'>
                <div className='container'>
                    <div className='section-header'>
                        <h2 data-custom-title="section">Tools Used</h2>
                        {( projectLink || projectGithub) && (
                            <div className='list-buttons'>
                                {projectLink && (
                                    <Button
                                        className="invert-position"
                                        iconSrc={project.current_online ? "arrow-dg.svg" : "offline.svg"}
                                        iconWidth="24"
                                        iconHeight="24"
                                        iconAlt="Arrow"
                                        label={project.current_online ? "View Project" : "Project Offline"}
                                        link={project.current_online ? project.link_project : '' }
                                        newTab
                                    />
                                )}
                                {projectGithub && (                            
                                    <Button
                                        className="invert-position"
                                        iconSrc="arrow-dg.svg"
                                        iconWidth="24"
                                        iconHeight="24"
                                        iconAlt="Arrow"
                                        label="GitHub Code"                            
                                        link={project.link_github}
                                        newTab
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
            {projectReviews && projectReviews.length > 0 && (
                <section className='reviews single'>
                    <div className='container'>
                        <div className='section-header'>
                            <h2 data-custom-title="section">{ projectReviews.length <= 1 ? "Review" : "Reviews"}</h2>                    
                        </div>
                        <div className='section-content'>
                            <Swiper
                                modules={[Pagination]}
                                spaceBetween={8}
                                slidesPerView={1}
                                pagination={{ clickable: true, dynamicBullets: true }}
                                >
                                {projectReviews.map((item,index) => (                        
                                    <SwiperSlide key={index}>
                                        <CardReview                                 
                                            data={item}
                                        />
                                    </SwiperSlide>                                    
                                ))}
                            </Swiper>
                            
                        </div>                
                    </div>
                </section>
            )}
        </>
    );
};