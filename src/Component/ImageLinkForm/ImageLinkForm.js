import React from 'react';
import './ImageLinkForm.css'

function ImageLinkForm({onInputChange, onButtonSubmit}) {
    return(
      <div className = "white ma4 mt0">
        <p className = "f4">
          {'This Magic Brain will detect faces in your pictures. Git it a try.'}
        </p>
        <div className='center'>
          <div className='form center pa4 br3 shadow-5'>
            <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}/>
            <button className='w-30 grow f4 link ph3 pv2 dib white bg-dark-blue Choco' onClick={onButtonSubmit}>
              Detect
            </button>
          </div>
        </div>
      </div>
    );
}

export default ImageLinkForm;
