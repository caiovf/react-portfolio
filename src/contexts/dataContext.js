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
    loading: {
      about: true,
      skills: true,
      projects: true,
    },
    error: null,
  });

  const fetchExecuted = useRef({ about: false, skills: false, projects: false });

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

  }, []);

  return (
    <DataContext.Provider value={{ state, setState }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
