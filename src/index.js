import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

import {WeatherDisplay} from './WeatherDisplay';
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
    content = <WeatherDisplay lat={lat} lon={lon} />;
  } else {
    content = <Loader message="Please accept location request" />;
  }

  return (
    <div>{content}</div>
  );
};


ReactDOM.render(
  <App />, document.querySelector('#root')
);
