import React, { useEffect } from 'react';
import './home.scss';
import { Profile } from '../../components/sections/home/profile';
import { Skills } from '../../components/sections/home/skills';
import { SectionPortfolio } from '../../components/sections/home/portfolio';
import { Reviews } from '../../components/sections/home/reviews/reviews';
export const Home = (props) => {

  useEffect(() => {
    document.title = 'Home | Caio Ferreira Front End Developer';
  }, []);

  return (
    <>
      <Profile />
      <Skills />
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