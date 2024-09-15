import React, {useEffect,useContext} from 'react';
import './about.scss';
import { PageTitle } from '../../components/page-title';
import { Reviews } from '../../components/sections/home/reviews';
import { Skills } from '../../components/sections/home/skills';
import { DataContext } from '../../contexts/dataContext';
import { Profile } from '../../components/sections/home/profile';

export const About = (props) => {
    const { state } = useContext(DataContext);
    const aboutData = state.aboutData;
    const skillsData = state.skillsData;
    
    const pageTitle = aboutData.page_title ? aboutData.page_title : '';
    const pageResumn = aboutData.page_description ? aboutData.page_description : '';

    useEffect(() => {
        document.title = `About | Caio Ferreira Front End Developer`;
    }, []);

    return (
        <>
            <PageTitle 
                title={pageTitle}
                resumn={pageResumn}
            />
            <Skills
                title="I Work With"
                data={skillsData}
            />
            <Profile/>
            <Profile/>
            <Reviews />
            <Profile/>
        </>
    );
};