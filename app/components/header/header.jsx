import React from 'react';
import './header.scss';
import { Logo } from '../logo';
import { Navigation } from '../navigation';
import { SocialMedia } from '../social-media';

export const Header = (props) => {  

  return (
    <header className="layout-header">
		<div className='container'>
			<div className='section-content'>
				<Logo />
				<Navigation />
				<SocialMedia />
			</div>
		</div>
    </header>    
  );
};