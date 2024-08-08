import React, { useContext } from 'react';
import { DataContext } from '../../contexts/dataContext';
import './home.scss';
import { Profile } from '../../components/sections/home/profile';
import { Skills } from '../../components/sections/home/skills';
import { SectionPortfolio } from '../../components/sections/home/portfolio';
import { Reviews } from '../../components/sections/home/reviews/reviews';

export const Home = (props) => {  
  const { state } = useContext(DataContext);
  
  const profileData = state.aboutData;
  const skillsData = state.skillsData;

  return (
    <>
      <Profile data={profileData} />
      <Skills data={skillsData} />
      <SectionPortfolio 
        titulo="Portfolio"
      />
      <Reviews />
      <SectionPortfolio 
        titulo="Advancing my skills"
        type="estudo"
      />
    </>    
  );
};
