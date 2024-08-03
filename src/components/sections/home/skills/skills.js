import React from 'react';
import './skills.scss';
import { Button } from '../../../button';

export const Skills = (props) => {       

    return (
        <section className='section-home skills'>
            <div className='container'>
                <div className='section-header'>
                    <h2 data-custom-title="section">My Skills</h2>
                </div>
                <div className='section-content'>                
                    <Button
                        iconSrc="html.png"
                        iconWidth="24"
                        iconHeight="24"
                        iconAlt="Icone html"
                        label="HTML"
                        navigate="/portfolio"
                        value="html"
                        customColor="#FF4B00"
                    />
                </div>
            </div>
        </section>    
    );
};