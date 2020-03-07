import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css';
import flash from './flash.png';
function Logo() {
    return(
      <div className = "ma4 mt0">
        <Tilt className="Tilt br2" options={{ max : 25 }} style={{ height: 100, width: 100 }} >
         <div className="Tilt-inner">
           <img alt='logo' src = {flash}/>
         </div>
        </Tilt>
      </div>
    );
}

export default Logo;
