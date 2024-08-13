import React, { useEffect } from 'react';
import './portfolio.scss';

import { PageTitle } from '../../components/page-title';
import { List } from '../../components/sections/portfolio/list';

export const Portfolio = (props) => {

  useEffect(() => {
    document.title = 'Portfolio | Caio Ferreira Front End Developer';
  }, []);

  return (
    <>
        <PageTitle />
        <List />
    </>
  );
};