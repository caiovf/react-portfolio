import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import './portfolio.scss';
import { DataContext } from '../../contexts/dataContext';
import { PageTitle } from '../../components/page-title';
import { List } from '../../components/sections/portfolio/list';

export const Portfolio = (props) => {
  const location = useLocation();
  const type = location.state?.filter;
  const { state } = useContext(DataContext);
  const portfolioData = (type === 'advancing-skills') ? state.projectsData.study : state.projectsData.portfolio ;  
  const pageTitle = (type === 'advancing-skills') ? 'Advancing my Skills' : "Portfolio" ;  
  const pageResumn = (type === 'advancing-skills') ? 'Explore my portfolio to discover projects that highlight my continuous learning and skills development, featuring React, WordPress, and more.' : "Explore my work to see a range of projects utilizing HTML, CSS, JavaScript, jQuery, PHP, and WordPress. <a href='https://www.linkedin.com/in/caio-ferreiradev/' target='_blank' rel='nofollow noopener noreferrer'>Let's build something amazing together!</a>";

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
        />
    </>
  );
};