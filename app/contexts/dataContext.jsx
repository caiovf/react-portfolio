import React, { createContext, useState, useRef, useEffect } from 'react';
import { fetchData } from '../api/api'; 

const DataContext = createContext();

const DataProvider = ({ children }) => {
    const [state, setState] = useState({
        aboutData: {},
        skillsData: [],
        projectsData: {
            projects: [],
            portfolio: [],
            study: []
        },
        reviewsData: [],
        loading: {
            about: true,
            skills: true,
            projects: true,
            reviews: true
        },
        error: null,
        language: 'en-us'
    });

    const fetchExecuted = useRef({ about: false, skills: false, projects: false, reviews: false });

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const response = await fetchData('about');
                if (response && response.data) {
                    setState(prevState => ({
                        ...prevState,
                        aboutData: response.data,
                        loading: { ...prevState.loading, about: false },
                    }));
                } else {
                    throw new Error('Invalid about data format');
                }
            } catch (err) {
                console.error('Error fetching about data:', err);
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
                if (response && response.data) {
                    setState(prevState => ({
                        ...prevState,
                        skillsData: response.data,
                        loading: { ...prevState.loading, skills: false },
                    }));
                }
            } catch (err) {
                console.error('Error fetching skills data:', err);
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
                if (response && response.data) {
                    const allProjects = response.data || [];
                    const projects = allProjects.slice(0, 4);
                    const portfolioData = allProjects.filter(item => item.project_type === 'portfolio').slice(0, 4);
                    const studiesData = allProjects.filter(item => item.project_type === 'estudo').slice(0, 4);
                    setState(prevState => ({
                    ...prevState,
                    projectsData: {
                        projects: projects,
                        portfolio: portfolioData,
                        study: studiesData
                    },
                    loading: { ...prevState.loading, projects: false },
                    }));
                }
            } catch (err) {
                console.error('Error fetching Projects data:', err);
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
                if (response && response.data) {
                    setState(prevState => ({
                    ...prevState,
                    reviewsData: response.data,
                    loading: { ...prevState.loading, reviews: false },
                    }));
                }
            } catch (err) {
                console.error('Error fetching Reviews data:', err);
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
        if (!state.projectsData) return null;
        return (
            (state.projectsData.portfolio || []).find(project => project.slug === slug) ||
            (state.projectsData.study || []).find(project => project.slug === slug)
        );
    }

    const getCategoriesById = (categories = []) => {
        if (!state.skillsData) return [];
        return (
            state.skillsData.filter(category => categories.includes(category.id))
        )
    }

    const getCategoryBySlug = (categories = []) => {
        if (!state.skillsData) return null;
        return (
            state.skillsData.filter(category => categories.includes(category.slug))[0]
        )
    }

    const getReviewsByProjectId = (projectId) => {
        if (!state.reviewsData) return [];
        return (
            state.reviewsData.filter(review => review.project_id === projectId)
        )
    }

    return (
        <DataContext.Provider value={{ state, setState, getProjectBySlug, getCategoriesById, getCategoryBySlug, getReviewsByProjectId }}>
        {children}
        </DataContext.Provider>
    );
};

export { DataContext, DataProvider };