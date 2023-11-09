import React, { Component } from 'react';
import Navigation from '../components/Navigation/Navigation';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import FaceRecongnition from '../components/FaceRecongnition/FaceRecongnition';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';

const initialState = {
  input: '',
  imageUrl: '',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  componentDidMount() {
    // Check for connection to the backend
    fetch('http://localhost:3000/', {
      method: 'get',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to connect to the backend");
        }
      })
      .catch((error) => {
        toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER,
      });
    });
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFaces = data.outputs[0].data.regions.map(region => region.region_info.bounding_box);
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return clarifaiFaces.map(face => {
      return {
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - (face.right_col * width),
        bottomRow: height - (face.bottom_row * height)
      }
    });
  }

  displayBoundingBox = (boxes) => {
    this.setState({ boxes: boxes });
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  isValidURL = (url) => {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlPattern.test(url);
  }

  onImageSubmit = () => {
    // Check if the URL is empty or not a valid URL
    if (!this.state.input || !this.isValidURL(this.state.input)) {
      // Handle the case where the URL is empty or invalid
      toast.error("Please enter a valid URL for an image.", {
        position: toast.POSITION.TOP_CENTER
    });
      return;
    }
    this.setState({imageUrl: this.state.input});
    fetch('http://localhost:3000/imageurl', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON
      .stringify({
        input: this.state.input
      })
    })
    .then((response) => {
      if (response.status === 500) {
        throw new Error("Sorry, we are currently unable to connect to the API");
      }
      return response.json();
    })
    .then((result) => {
      const parsedResponse = JSON.parse(result);
      if (parsedResponse) {
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON
          .stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, { entries: count}))
        })
        .catch(console.log)
      }
      this.displayBoundingBox(this.calculateFaceLocation(parsedResponse))
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signin' || route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, boxes } = this.state;
    return (
      <div className="App">
        <ParticlesBg color="afafaf" type="cobweb" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home'
          ? <div>
            <ToastContainer autoClose={2000}/>
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <div className='w-100 center'>
              <article className="br3 ba b--black-10 mv4 shadow-5 blur form">
                <ImageLinkForm onInputChange={this.onInputChange} onImageSubmit={this.onImageSubmit}/>
                <FaceRecongnition boxes={boxes} imageUrl={imageUrl}/>
              </article>
            </div>
          </div>
          : (
            route === 'signin' 
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;
