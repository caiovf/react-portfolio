import React from 'react';
import './profile.scss';
import { Button } from '../../../button';
import imgProfile from '../../../../assets/img/profile.jpeg';

export const Profile = (props) => {
    return (
        <section className='profile'>
            <div className='container'>
                <div className='left-content'>
                    <h1 data-custom-title="banner">Caio Ferreira<br/>Front End Developer</h1>
                    <p>I am a front-end developer with over 6 years of experience in the field. My main focus is on developing modern and functional websites using technologies such as <strong>HTML, CSS, JavaScript, jQuery, PHP, and WordPress.</strong></p>
                    <Button                        
                        iconSrc="download.svg"
                        iconWidth="24"
                        iconHeight="24"
                        iconAlt="Icone Download"
                        label="Download CV"
                        link="https://github.com/caiovf"
                        download="true"
                    />
                </div>
                <div className='right-content'>
                    <img className="img-responsive" src={imgProfile} width="682" height="682" alt="Foto de Caio Ferreira" />
                </div>
            </div>
        </section>    
    );
};