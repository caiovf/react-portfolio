import React, { useEffect, useContext } from 'react';
import { useLocation,useParams } from 'react-router-dom';
import './portfolio.scss';
import { DataContext } from '../../contexts/dataContext';
import { PageTitle } from '../../components/page-title';
import { List } from '../../components/sections/portfolio/list';

export const Portfolio = (props) => {    
  const location = useLocation();
  const { category } = useParams();  
  const selectedCategory = category || location.state?.filter || 'portfolio';  
  const { state,getCategoryBySlug } = useContext(DataContext);
  let portfolioData = state.projectsData.projects;
  let pageTitle = "Portfolio";  
  let pageResumn = "Explore all of my projects, both real and study-based. This section offers a comprehensive view of my work, highlighting my skills across various technologies and creative approaches. <a href='/portfolio' title='Want to see only real projects? Explore them here'>Want to see only real projects? Explore them here.</a>";
  const categoryObject = category ? getCategoryBySlug(selectedCategory) : '';  

  const {
    id: categoryId = '',
    name: categoryName = ''
  } = categoryObject || {};

  if( selectedCategory === 'advancing-skills' || selectedCategory === 'portfolio'){
    portfolioData = (selectedCategory === 'advancing-skills') ? state.projectsData.study : state.projectsData.portfolio;  
    pageTitle = (selectedCategory === 'advancing-skills') ? 'Advancing my Skills' : "Portfolio" ;  
    pageResumn = (selectedCategory === 'advancing-skills') ? 'Explore my portfolio to discover projects that highlight my continuous learning and skills development, featuring React, WordPress, and more. Want to see how these skills are applied in real-world scenarios? <a href="/portfolio" title="Check out my full portfolio">Check out my full portfolio</a>.' : "Explore my work to see a range of projects utilizing HTML, CSS, JavaScript, jQuery, PHP, and WordPress. Ready to build something amazing together? <a href='https://www.linkedin.com/in/caio-ferreiradev/' title='Let's get started!' target='_blank' rel='nofollow noopener noreferrer'>Let's get started!</a>";
  }

  if(category){
    pageTitle = `${pageTitle} - ${categoryName}`
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