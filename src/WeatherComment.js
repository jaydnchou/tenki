import React from 'react';

import './WeatherComment.css';


export const WeatherComment = ({temp, wind, rain}) => {
  let comment = '';

  if (rain >= 10) return comment = "Stay home, it's pissin' out";
  if (wind >= 15) return comment = "Literally gone with the wind";
  if (temp < 0) return comment = "Entering hiberation mode";
  if (temp >= 0 && temp <= 10) return comment = "Pretty, but cold as fuck";
  if (temp >= 10 && temp <= 20) return comment = "Cool as a Menthol's kiss";
  if (temp >= 20 && temp <= 25) return comment = "Enjoy this gorgeous day!";
  if (temp >= 25 && temp <= 30) return comment = "Get yo pale ass to the beach";
  if (temp >= 30) return comment = "Yep, it's gonna be a real stinker";
 
  return <div className="weather-comment">{comment}</div>;
};
