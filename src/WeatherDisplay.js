import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {WeatherComment} from './WeatherComment';
import {ForecastDisplay} from './ForecastDisplay';
import {Loader} from './Loader';

import './WeatherDisplay.css';


export const WeatherDisplay = ({lat, lon}) => {
  const [temp, setTemp] = useState(null);
  const [windSpeed, setWindSpeed] = useState(null);
  const [rainVol, setRainVol] = useState(null);
  const [locality, setLocality] = useState(null);

  const [showForecast, setShowForecast] = useState(false);
  const [prevBtnActive, setPrevBtnActive] = useState(true);
  const [nextBtnActive, setNextBtnActive] = useState(false);

  const params = `lat=${lat}&lon=${lon}`;
  const url = `${process.env.REACT_APP_OPEN_WEATHER_URL}weather?${params}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;

  useEffect(() => {
    async function fetchTemp() {
      const res = await axios.get(url);
      const {main, wind, rain, name} = res.data;

      if (res.status === 200) {
        if (rain && wind) {
          setTemp(main.temp);
          setWindSpeed(wind.speed);
          setRainVol(rain['1h'] || setRainVol(rain['3h']));
          setLocality(name);
        }
        if (wind && !rain) {
          setTemp(main.temp);
          setWindSpeed(wind.speed);
          setLocality(name);
        }
        if (rain && !wind) {
          setTemp(main.temp);
          setRainVol(rain['1h'] || setRainVol(rain['3h']));
          setLocality(name);
        }
        if (!rain && !wind) {
          setTemp(main.temp);
          setLocality(name);
        }
      }
    }
    fetchTemp();
  }, [url]);

  return (
    <div className="weather-display">
      {
        temp ? (
          <React.Fragment>
            <h3 className="header">
              {showForecast ? "Forecast" : "Today's weather"}
            </h3>
            <h1 className="temp">{Math.floor(temp)}&deg;</h1>
            <div>
              {showForecast ? <ForecastDisplay lat={lat} lon={lon} /> : (
                <h1 className="weather-comment">
                  <WeatherComment temp={temp} wind={windSpeed} rain={rainVol} />
                </h1>
              )}
            </div>
            <div className="scrollBtns">
              <button
                className={prevBtnActive ? "btn active" : "btn"}
                onClick={(() => {
                  setPrevBtnActive(true);
                  setNextBtnActive(false);
                  setShowForecast(false);
                })} />
              <button
                className={nextBtnActive ? "btn active" : "btn"}
                onClick={(() => {
                  setPrevBtnActive(false);
                  setNextBtnActive(true);
                  setShowForecast(true);
                })} />
            </div>
            <h2 className="locality">{locality}</h2>
          </React.Fragment>
        ) : <Loader />
      }
    </div>
  );
};
