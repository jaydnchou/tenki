import React from 'react';

import './WeatherComment.css';


const seasonConfig = {
  summer: {
    text: "Get yo pale ass to the beach",
    icon: 'sun'
  },
  winter: {
    text: "Pretty, but cold as fuck",
    icon: 'snowflake'
  }
};

export const getSeason = (lat, month) => {
  if (month > 2 && month < 9) {
    return lat > 0 ? 'summer' : 'winter'; 
  } else {
    return lat > 0 ? 'winter' : 'summer';
  }
};

export const WeatherComment = ({lat, lon}) => {
  const season = getSeason(lat, new Date().getMonth());
  const {text} = seasonConfig[season]

  return (
    <h1 className="weather-comment">{text}</h1>
  );
};
