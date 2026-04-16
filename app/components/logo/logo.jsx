import React from 'react';
import './logo.scss';
import { useNavigate } from 'react-router';
const logoImage = '/assets/img/logo.svg';

export const Logo = (props) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (    
    <div className='layout-logo'>
		<img
    className='img-responsive' 
		src={logoImage}
		alt="C Ferreira FrontEnd Developer"
    width="264"
    height="100"
		onClick={handleClick} 
		style={{ cursor: 'pointer' }}
		/>            
	</div>
  );
};