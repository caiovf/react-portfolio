import React, { useState } from 'react';
import './navigation.scss';
import { Link } from 'react-router-dom';

export const Navigation = (props) => {
    const [state,setState,selectedSkill,setSelectedSkill] = useState();    
    console.log(state);
    console.log(selectedSkill);
    console.log(setSelectedSkill);
    
    const handleLinkClick = () => {
        console.log('action');
        setState(null);
    
    };

    return (
        <nav 
            className="layout-nav"
            role="navigation"
            aria-label="main navigation"
        >
            <ul>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>                
                    <Link to="/projects/type/portfolio" onClick={handleLinkClick}>Portfolio</Link>
                </li>
                <li>                
                    <a href="https://www.linkedin.com/in/caio-ferreiradev/" title="Contact" target="_blank" rel="nofollow noopener noreferrer">Contact</a>
                </li>
            </ul>
        </nav>    
    );
};