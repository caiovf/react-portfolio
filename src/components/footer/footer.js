import React from 'react';
import './footer.scss';
import { SocialMedia } from '../social-media';
import { Logo } from '../logo';

export const Footer = (props) => {
  return (
    <footer className="layout-footer">
        <div className='container'>
            <div className='section-content'>
                <Logo />
                <SocialMedia />
            </div>
        </div>
    </footer>    
  );
};