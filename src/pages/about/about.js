import React, {useEffect,useContext} from 'react';
import './about.scss';
import { PageTitle } from '../../components/page-title';
import { Reviews } from '../../components/sections/home/reviews';
import { Skills } from '../../components/sections/home/skills';
import { DataContext } from '../../contexts/dataContext';
import { TextImage } from '../../components/text-image';

export const About = (props) => {
    const { state } = useContext(DataContext);
    const aboutData = state.aboutData;
    const skillsData = state.skillsData;
    const reviewsData = state.reviewsData;
    
    const pageTitle = aboutData.page_title ? aboutData.page_title : '';
    const pageResumn = aboutData.page_description ? aboutData.page_description : '';    

    const extractData = (data = {}) => {
        const { title = '', description = '', image = '' } = data;
        return { title, description, image };
    };
    
    const { title: howWorkTitle, description: howWorkDescription, image: howWorkImage } = extractData(aboutData.how_work);
    const { title: whenNotCodingTitle, description: whenNotCodingDescription, image: whenNotCodingImage } = extractData(aboutData.when_not_coding);
    const { title: letsWorkTitle, description: letsWorkDescription, image: letsWorkImage } = extractData(aboutData.lets_work);
    

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
                titulo="I Work With"
                data={skillsData}
            />
            <TextImage
                title={howWorkTitle}
                description={howWorkDescription}
                img={howWorkImage}
            />
            <TextImage
                title={whenNotCodingTitle}
                description={whenNotCodingDescription}
                img={whenNotCodingImage}
                alternate={true}
            />
            <Reviews 
                titulo="What Clients Are Saying"
                data={reviewsData}
            />
            <TextImage
                title={letsWorkTitle}
                description={letsWorkDescription}
                img={letsWorkImage}
            />
        </>
    );
};