import React, { useContext } from 'react';
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
  return (
    <>
      <Profile 
        data={profileData}
      />
      <Skills 
        data={skillsData}
      />
      <SectionPortfolio 
        titulo="Portfolio"
        data={portfolioData}
      />
      <Reviews 
        data={reviewsData}
      />
      <SectionPortfolio 
        titulo="Advancing my skills"
        type="estudo"
        data={studyData}        
      />
    </>    
  );
};
