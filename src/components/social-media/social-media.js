import React from 'react';
import './social-media.scss';
import { Button } from '../button';

export const SocialMedia = (props) => {
  return (
    <ul className="social-media">
        <li>
            <Button
              className="only-icon"
              iconSrc="github.svg"
              iconWidth="24"
              iconHeight="24"
              iconAlt="Icone Github"
              link="https://github.com/caiovf"
              newTab="true"
            />
        </li>
        <li>
            <Button
              className="only-icon"
              iconSrc="linkedin.svg"
              iconWidth="24"
              iconHeight="24"
              iconAlt="Icone Linkedin"
              link="https://www.linkedin.com/in/caio-ferreiradev/"
              newTab="true"
            />
        </li>
    </ul>
  );
};