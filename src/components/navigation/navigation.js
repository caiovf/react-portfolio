import React from 'react';
import './navigation.scss';
import { Link } from 'react-router-dom';

export const Navigation = (props) => {
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
                <Link to="/portfolio">Portfolio</Link>
            </li>
            <li>                
                <a href="https://www.linkedin.com/in/caio-ferreiradev/" title="Contact" target="_blank" rel="nofollow noopener noreferrer">Contact</a>
            </li>
        </ul>
    </nav>    
  );
};

// export default Navigation;