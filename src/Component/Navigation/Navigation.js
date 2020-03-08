import React from 'react';
import './Navigation.css'
function Navigation({onRouteChange, isSignin}) {
  let nav_bar;
  if(isSignin) {
    nav_bar =
    <nav>
      <p onClick={()=>onRouteChange('signin')} className='f3 link dim white underline pa3 pointer'>Sign Out</p>
    </nav>;
  } else {
    nav_bar =
    <nav>
      <p onClick={()=>onRouteChange('signin')} className='f3 link dim white underline pa3 pointer'>Sign In</p>
      <p onClick={()=>onRouteChange('register')} className='f3 link dim white underline pa3 pointer'>Register</p>
    </nav>;
  }
  return(nav_bar);
}

export default Navigation;
