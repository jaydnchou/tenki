import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {WeatherComment} from './WeatherComment';

import './WeatherDisplay.css';


export const WeatherDisplay = ({lat, lon}) => {
  const [temp, setTemp] = useState(null);
  const [locality, setLocality] = useState(null);
  const params = `lat=${lat}&lon=${lon}`;

  const url = `${process.env.REACT_APP_OPEN_WEATHER_URL}weather?${params}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;

  useEffect(() => {
    async function fetchTemp() {
      const res = await axios.get(url);

      if (res.status === 200) {
        const {main, name, sys} = res.data;
        setTemp(main.temp);
        setLocality(`${name}, ${sys.country}`);
      }
    }
    fetchTemp();
  }, [url]);

  return (
    <div className="weather-display">
      <h1 className="temp">{temp}&deg;</h1>
      <WeatherComment lat={lat} lon={lon} />
      <h2 className="locality">{locality}</h2>
    </div>
  );
};
