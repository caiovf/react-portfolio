import React, { useContext,useEffect } from 'react';
import './portfolio-single.scss';
import { useLocation } from 'react-router-dom';
import { DataContext } from '../../contexts/dataContext';


export const PortfolioSingle = (props) => {   
    const { getProjectBySlug } = useContext(DataContext);
    const location = useLocation();
    const type = location.state?.slug;
    const project = getProjectBySlug(type);    

    useEffect(() => {
        document.title = `${project.title} | Caio Ferreira Front End Developer`;
    }, [project.title]);

    return (
        <>
            
            
        </>
    );
};