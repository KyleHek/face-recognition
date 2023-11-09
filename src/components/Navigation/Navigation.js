import React from 'react';
import Logo from '../Logo/Logo';

const Navigation = ({ onRouteChange, isSignedIn }) => {
        if(isSignedIn) {
            return (
                <nav className='flex justify-between'>
                    <Logo />
                    <div className='mr4 o-90 mt4'>
                        <span onClick={() => onRouteChange('signin')} className='f4 link bg-transparent white shadow-5 br3 dim pointer pa3'>Sign Out</span>
                    </div>
                </nav>
            ); 
        } else {
            return (
                <nav className='flex justify-between'>
                    <Logo />
                    <div className='mr4 o-90 mt4'>
                        <span onClick={() => onRouteChange('signin')} className='f4 mr2 link bg-transparent white shadow-5 br3 dim pointer pa3'>Sign In</span>
                        <span onClick={() => onRouteChange('register')} className='f4 link bg-transparent white shadow-5 br3 dim pointer pa3'>Register</span>
                    </div>
                </nav>
            );
        }
}

export default Navigation;