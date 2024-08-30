import React from 'react';
import { useNavigate } from 'react-router-dom';
import './navigation.scss';
import { Link } from 'react-router-dom';

export const Navigation = (props) => {
    const navigate = useNavigate(); 
    
    const handleClick = (e) => {
        e.preventDefault();
        navigate('/portfolio', { state: { filter: 'portfolio' } });        
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
                    <Link to="/portfolio" onClick={handleClick}>Portfolio</Link>
                </li>
                <li>                
                    <a href="https://www.linkedin.com/in/caio-ferreiradev/" title="Contact" target="_blank" rel="nofollow noopener noreferrer">Contact</a>
                </li>
            </ul>
        </nav>    
    );
};