import React, { createContext, useState, useRef, useEffect } from 'react';
import { fetchData } from '../api/api'; 

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [state, setState] = useState({
    aboutData: null,
    skillsData: null,
    loading: {
      about: true,
      skills: true,
    },
    error: null,
  });

  const fetchExecuted = useRef({ about: false, skills: false });

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

    if (!fetchExecuted.current.about) {
      fetchAboutData();
      fetchExecuted.current.about = true;
    }

    if (!fetchExecuted.current.skills) {
      fetchSkillsData();
      fetchExecuted.current.skills = true;
    }
  }, []);

  return (
    <DataContext.Provider value={{ state, setState }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
