import React from 'react';

import {SeasonDisplay} from './SeasonDisplay';

import './ForecastDisplay.css';


export const ForecastDisplay = ({lat, lon}) => {
  console.log(lat, lon);
  return (
    <div className="forecast-display">
      <h1 className="temp">-3&deg;</h1>
      <SeasonDisplay lat={lat} lon={lon} />
    </div>
  );
};
