import React from 'react';
import './FaceRecognition.css'

function FaceRecognition({faceBox, imageUrl}) {
  let box_list = faceBox.map((box, index)=>{
      // console.log(box);
      return (<li key = {"faceDetected" + index} className = "bounding-box" style={box}>
      </li>)
    });
  return (
    <div className="center">
      <div className="absolute mt2" style= {{margin: "0 0 0 0"}}>
        <img id = "input_image" alt="" src={imageUrl} width="500px" height="auto"/>
        <ul>
          {box_list}
        </ul>
      </div>
    </div>
  );
}

export default FaceRecognition;
