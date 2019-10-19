import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {WeatherDisplay} from './WeatherDisplay';
import {Loader} from './Loader';

import img from './assets/leaf.jpeg';
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
    content = <div className="content">{error}</div>;
  } else if (lat && lon) {
    content = <WeatherDisplay lat={lat} lon={lon} />;
  } else {
    content = (
      <div className="content"> 
        <Loader message="Please accept location request" />
      </div>
    );
  }

  return (
    <div className="container">
      <img className="bgd" src={img} alt="background" />
      {content}
    </div>
  );
};


ReactDOM.render(
  <App />, document.querySelector('#root')
);
