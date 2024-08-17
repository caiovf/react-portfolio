import React, {useEffect} from 'react';
import './about.scss';
import { Profile } from '../../components/sections/home/profile';

export const About = (props) => {

  useEffect(() => {
    document.title = `About | Caio Ferreira Front End Developer`;
  }, []);

  return (
    <Profile />
  );
};