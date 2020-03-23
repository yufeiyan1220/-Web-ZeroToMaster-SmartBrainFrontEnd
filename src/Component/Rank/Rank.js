import React from 'react';
import './Rank.css'
function Rank({userState}) {
  return (
    <div className="white f3 Choco">
      <div>
        {`${userState.name}, your current rank is...`}
      </div>
      <div className = "f1 rank">
        {`#${userState.entries}`}
      </div>
    </div>
  );
}

export default Rank;
