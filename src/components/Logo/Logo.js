import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';

const Logo = () => {
    return (
        <Tilt className='ma3 mt3 flex justify-center items-center shadow-2 o-80 w4 h4 ba br-100 black bg-lightest-blue'>
            <img className='w3 h3' alt='logo' src={brain}/>
        </Tilt>
    )
}

export default Logo;