import React from 'react';
import './page-title.scss';

export const PageTitle = (props) => {
  return (
    <section className='page-title'>
        <div className='container'>
            <h1>PortFolio</h1>
            <p>Explore my work to see a range of projects utilizing HTML, CSS, JavaScript, jQuery, PHP, and WordPress. <a href="https://www.linkedin.com/in/caio-ferreiradev/" target="_blank" rel="nofollow noopener noreferrer">Let's build something amazing together!</a></p>
        </div>
    </section>
  );
};