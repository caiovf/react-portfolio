import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './navigation.scss';
import { Link } from 'react-router-dom';
import { SocialMedia } from '../social-media';

export const Navigation = (props) => {
    const navigate = useNavigate();         
    const iconMenu = require('../../assets/img/icons/menu.png');
    const iconClose = require('../../assets/img/icons/close.png');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        navigate('/portfolio', { state: { filter: 'portfolio' } });        
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) =>  !prev);         
    };

    return (
        <>
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
                        <a title="Contact" href="https://www.linkedin.com/in/caio-ferreiradev/" target="_blank" rel="nofollow noopener noreferrer">Contact</a>
                    </li>
                </ul>
            </nav>
            <button
                className='toggle-menu-mobile' 
                aria-label="Open menu"
                aria-expanded={isMobileMenuOpen}
                onClick={toggleMobileMenu}
            >
                <img src={iconMenu} width={48} height={48} alt='icon to open mobile menu'></img>
            </button>
            <div className={`menu-mobile ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className='menu-mobile-content'>
                    <button
                        className='toggle-menu-mobile' 
                        aria-label="Close menu"
                        onClick={toggleMobileMenu}
                    >
                        <img src={iconClose} width={30} height={30} alt='icon to close mobile menu'></img>
                    </button>
                    <ul>
                        <li>
                            <Link to="/about" onClick={toggleMobileMenu}>About</Link>
                        </li>
                        <li>                
                            <Link to="/portfolio" onClick={handleClick}>Portfolio</Link>
                        </li>
                        <li>                
                            <a title="Contact" href="https://www.linkedin.com/in/caio-ferreiradev/" target="_blank" rel="nofollow noopener noreferrer">Contact</a>
                        </li>
                    </ul>
                    <SocialMedia />
                </div>
            </div>
        </>
    );    
};