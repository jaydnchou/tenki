import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

import {ForecastDisplay} from './ForecastDisplay';
import {Loader} from './Loader';

import './App.css'

const App = () => {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      pos => {
        return (
          setLat(pos.coords.latitude),
          setLon(pos.coords.longitude)
        );
      },
      err => setError(err.message));
  }, []);

  let content;
  if (error) {
    content = <div>{error}</div>;
  } else if (lat && lon) {
    content = <ForecastDisplay lat={lat} lon={lon} />;
  } else {
    content = <Loader message="Please accept location request" />;
  }

  return (
    <div className="current-forecast">
      {content}
    </div>
  );
};

// class App extends React.Component {
//   state = {
//     lat: null,
//     lon: null,
//     error: ''
//   };

//   componentDidMount = () => {
//     navigator.geolocation.getCurrentPosition(
//       pos => this.setState({
//         lat: pos.coords.latitude,
//         lon: pos.coords.longitude
//       }),
//       err => this.setState({error: err.message})
//     );
//   }

//   renderContent = () => {
//     if (this.state.error) {
//       return <div>{this.state.error}</div>;
//     }

//     if (this.state.lat && this.state.lon) {
//       return <SeasonDisplay lat={this.state.lat} lon={this.state.lon} />;
//     }

//     return <Loader message="Please accept location request" />;
//   }

//   render() {
//     return <div>{this.renderContent()}</div>;
//   }
// }

ReactDOM.render(
  <App />, document.querySelector('#root')
);
