import React, { createContext, useState, useRef, useEffect } from 'react';
import { fetchData } from '../api/api'; 

const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [state, setState] = useState({
        aboutData: null,
        skillsData: null,
        projectsData: {
            portfolio: null,
            study: null
        },
        reviewsData: null,
        loading: {
            about: true,
            skills: true,
            projects: true,
            reviews: true
        },
        error: null,
    });

    const fetchExecuted = useRef({ about: false, skills: false, projects: false, reviews: false });

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
            const response = await fetchData('about');
            setState(prevState => ({
                ...prevState,
                aboutData: response.data,
                loading: { ...prevState.loading, about: false },
            }));
            } catch (err) {
            setState(prevState => ({
                ...prevState,
                error: prevState.error ? prevState.error : 'Error fetching about data',
                loading: { ...prevState.loading, about: false },
            }));
            }
        };

        const fetchSkillsData = async () => {
            try {
            const response = await fetchData('categories');
            setState(prevState => ({
                ...prevState,
                skillsData: response.data,
                loading: { ...prevState.loading, skills: false },
            }));
            } catch (err) {
            setState(prevState => ({
                ...prevState,
                error: prevState.error ? prevState.error : 'Error fetching skills data',
                loading: { ...prevState.loading, skills: false },
            }));
            }
        };

        const fetchProjectsData = async () => {
            try {
                const response = await fetchData('projects');
                const portfolioData = response.data.filter(item => item.project_type === 'portfolio').slice(0, 4);
                const studiesData = response.data.filter(item => item.project_type === 'estudo').slice(0, 4);
                setState(prevState => ({
                ...prevState,
                projectsData: {
                    portfolio: portfolioData,
                    study: studiesData
                },
                loading: { ...prevState.loading, projects: false },
                }));
            } catch (err) {
                setState(prevState => ({
                    ...prevState,
                    error: prevState.error ? prevState.error : 'Error fetching Projects data',
                    loading: { ...prevState.loading, projects: false },
                }));
            }
        };

        const fetchReviewsData = async () => {
            try {
                const response = await fetchData('reviews');
                setState(prevState => ({
                ...prevState,
                reviewsData: response.data,
                loading: { ...prevState.loading, reviews: false },
                }));
            } catch (err) {
                setState(prevState => ({
                    ...prevState,
                    error: prevState.error ? prevState.error : 'Error fetching Reviews data',
                    loading: { ...prevState.loading, reviews: false },
                }));
            }
        };

        if (!fetchExecuted.current.about) {
            fetchAboutData();
            fetchExecuted.current.about = true;
        }

        if (!fetchExecuted.current.skills) {
            fetchSkillsData();
            fetchExecuted.current.skills = true;
        }

        if (!fetchExecuted.current.projects) {
            fetchProjectsData();
            fetchExecuted.current.projects = true;
        }

        if (!fetchExecuted.current.reviews) {
            fetchReviewsData();
            fetchExecuted.current.reviews = true;
        }

    }, []);

    const getProjectBySlug = (slug) => {
        return (
            state.projectsData.portfolio.find(project => project.slug === slug) ||
            state.projectsData.study.find(project => project.slug === slug)
        );
    }

    const getCategoriesById = (categories) => {
        return (
            state.skillsData.filter(category => categories.includes(category.id))
        )
    }

    return (
        <DataContext.Provider value={{ state, setState, getProjectBySlug, getCategoriesById }}>
        {children}
        </DataContext.Provider>
    );
};

export { DataContext, DataProvider };
