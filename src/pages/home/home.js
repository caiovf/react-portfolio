import React, { useContext, useEffect } from 'react';
import { DataContext } from '../../contexts/dataContext';
import './home.scss';
import { Profile } from '../../components/sections/home/profile';
import { Skills } from '../../components/sections/home/skills';
import { SectionPortfolio } from '../../components/sections/home/portfolio';
import { Reviews } from '../../components/sections/home/reviews';

export const Home = (props) => {  
  const { state } = useContext(DataContext);
  
  const profileData = state.aboutData;
  const skillsData = state.skillsData;
  const portfolioData = state.projectsData.portfolio;
  const studyData = state.projectsData.study;
  const reviewsData = state.reviewsData;  

  useEffect(() => {
    document.title = `Home | Caio Ferreira Front End Developer`;
  }, []);
  
  return (
    <>
      <Profile 
        title={profileData.title}
        description={profileData.description}
        img={profileData.image}
      />
      <Skills 
        titulo="Skills"
        data={skillsData}
      />
      <SectionPortfolio 
        titulo="Portfolio"
        data={portfolioData}
      />
      <Reviews
        titulo="Reviews" 
        data={reviewsData}
      />
      <SectionPortfolio 
        titulo="Advancing my skills"
        type="advancing-skills"
        data={studyData}        
      />
    </>    
  );
};
