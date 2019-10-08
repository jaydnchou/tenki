import React from 'react';

import './SeasonDisplay.css';


const seasonConfig = {
  summer: {
    text: "It's getting hot in here",
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

export const SeasonDisplay = ({lat, lon}) => {
  console.log(lat, lon);
  const season = getSeason(lat, new Date().getMonth());
  const {text} = seasonConfig[season]

  return (
    <h1 className="season-display">{text}</h1>
  );
};
