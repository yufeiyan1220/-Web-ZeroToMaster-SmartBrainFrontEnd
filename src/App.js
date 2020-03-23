import React, {Component} from 'react';
import Clarifai from 'clarifai';

import Navigation from './Component/Navigation/Navigation.js';
import Logo from './Component/Logo/Logo.js';
import ImageLinkForm from './Component/ImageLinkForm/ImageLinkForm.js';
import Rank from './Component/Rank/Rank.js'
import './App.css';
import FaceRecognition from './Component/FaceRecognition/FaceRecognition.js'
import Signin from './Component/Signin/Signin.js'
import Register from './Component/Register/Register.js'

import Particles from 'react-particles-js';
import 'tachyons'

// initialize with your api key. This will also work in your browser via http://browserify.org/

const app = new Clarifai.App({
 apiKey: 'fb804f1e792749c9bd5b34a04fcbf744'
});

let particalOptions = {
  "particles": {
    "number": {
      "value": 160,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 1,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 4,
        "size_min": 0.3,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 600
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "bubble"
      },
      "onclick": {
        "enable": true,
        "mode": "repulse"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 250,
        "size": 0,
        "duration": 2,
        "opacity": 0,
        "speed": 3
      },
      "repulse": {
        "distance": 400,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input : '',
      imageUrl: '',
      box:[],
      userLoaded: null,
      route:'signin'
    }
  }

  onInputChange = (event) => {
    // console.log(this);
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    // console.log("click");
    this.setState({imageUrl: this.state.input});
  }

  onRouteChange = (route) => {
    this.setState({route: route});
  }

  onUserStateChange = (userLoaded) => {
    this.setState({userLoaded: userLoaded});
  }

  calculateFaceLocation(response) {
    let regions = response.outputs[0].data.regions.map(region=>region.region_info.bounding_box);
    let image = document.getElementById('input_image');
    let width = Number(image.width);
    let height = Number(image.height);
    let points = [];
    for(let region of regions) {
      console.log(region);
      let {top_row, left_col, bottom_row, right_col} = region;
      let point = {top : top_row * height, right : width - right_col * width, bottom : height - bottom_row * height, left : left_col * width};
      points.push(point);
    }
    this.displayBox(points);
    return regions;
  }

  displayBox(box) {
    this.setState({box : box});
  }

  render() {
    console.log("renderTimes");
    let content_display;
    if(this.state.route === 'signin') {
      content_display =
      <div>
        <Navigation onRouteChange = {this.onRouteChange} userState = {this.state.userLoaded} onUserStateChange = {this.onUserStateChange} />
        <Signin onRouteChange = {this.onRouteChange} onUserStateChange = {this.onUserStateChange} />
      </div>;
    }
    else if(this.state.route === 'home'){
      content_display =
      <div>
        <Navigation onRouteChange = {this.onRouteChange} userState = {this.state.userLoaded} onUserStateChange = {this.onUserStateChange}/>
        <Logo />
        <Rank userState = {this.state.userLoaded} />
        <ImageLinkForm
           onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}
        />
         <FaceRecognition faceBox = {this.state.box} imageUrl = {this.state.imageUrl} />
      </div>;
    }
    else if(this.state.route === 'register') {
      content_display =
      <div>
        <Navigation onRouteChange = {this.onRouteChange} userState = {this.state.userLoaded} onUserStateChange = {this.onUserStateChange}/>
        <Register onRouteChange = {this.onRouteChange} onUserStateChange = {this.onUserStateChange} />
      </div>;
    }

    return (
      <div className="App">
        <Particles className='particals' params = {particalOptions}/>

        {content_display}
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    // Typical usage (don't forget to compare props):
    if (this.state.imageUrl !== prevState.imageUrl) {
      app.models.initModel({id: Clarifai.FACE_DETECT_MODEL})
        .then(generalModel => {
          return generalModel.predict(this.state.input);
        })
        .then((response)=>{
          let res = this.calculateFaceLocation(response);

          let sentItem = {
            method: 'PUT', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({id:this.state.userLoaded.id})
          };

          fetch('http://localhost:3001/image', sentItem)
            .then(response=>response.json())
            .then(entries=>{
              let user_increase = Object.assign({}, this.state.userLoaded);
              user_increase.entries = entries;
              this.setState({userLoaded : user_increase});
            });
          // console.log(res);
          return res;
        })
        .catch(err=>console.log(err));
    }
  }
}

export default App;
