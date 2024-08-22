import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './portfolio.scss';
import { DataContext } from '../../contexts/dataContext';
import { PageTitle } from '../../components/page-title';
import { List } from '../../components/sections/portfolio/list';

export const Portfolio = (props) => {  
  const { category } = useParams();
  const { state,getCategoryBySlug } = useContext(DataContext);
  let portfolioData = state.projectsData.projects;
  let pageTitle = "Projects";  
  let pageResumn = "Explore all of my projects, both real and study-based. This section offers a comprehensive view of my work, highlighting my skills across various technologies and creative approaches. <a href='/projects/type/portfolio' title='Want to see only real projects? Explore them here'>Want to see only real projects? Explore them here.</a>";
  const categoryObject =  getCategoryBySlug(category);  

  const {
    id: categoryId = ''
} = categoryObject || {};

  if( category === 'advancing-skills' || category === 'portfolio'){
    portfolioData = (category === 'advancing-skills') ? state.projectsData.study : state.projectsData.portfolio;  
    pageTitle = (category === 'advancing-skills') ? 'Advancing my Skills' : "Portfolio" ;  
    pageResumn = (category === 'advancing-skills') ? 'Explore my portfolio to discover projects that highlight my continuous learning and skills development, featuring React, WordPress, and more.<a href="/projects/type/portfolio" title="Want to see how these skills are applied in real-world scenarios? Check out my full portfolio">Want to see how these skills are applied in real-world scenarios? Check out my full portfolio</a>' : "Explore my work to see a range of projects utilizing HTML, CSS, JavaScript, jQuery, PHP, and WordPress. <a href='https://www.linkedin.com/in/caio-ferreiradev/' title='Ready to build something amazing together? Let's get started!' target='_blank' rel='nofollow noopener noreferrer'>Ready to build something amazing together? Let's get started!</a>";
  }

  const AllSkills = state.skillsData.filter(skill => 
      portfolioData.some(project => project.categories.includes(skill.id))
  );  

  useEffect(() => {
    document.title = `${pageTitle} | Caio Ferreira Front End Developer`;
  }, [pageTitle]);

  return (
    <>
        <PageTitle 
          title={pageTitle}
          resumn={pageResumn}
        />
        <List 
          skills={AllSkills}
          projects={portfolioData}
          categoryFilter={categoryId} 
        />
    </>
  );
};