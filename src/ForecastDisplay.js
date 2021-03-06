import React, {useState, useEffect} from 'react';
import axios from 'axios';

import cloud from './assets/icons/cloud.svg';
import rain from './assets/icons/rain.svg';
import sun from './assets/icons/sun.svg';
import wind from './assets/icons/wind.svg';
import snow from './assets/icons/snow.svg';

import './ForecastDisplay.css';


export const Icon = ({weather}) => {
  let icon = '';

  if (weather) {
    switch (true) {
      case (weather.includes('Clouds') || weather.includes('Cloudy')):
        icon = cloud;
        break;
      case (weather.includes('Rain') || weather.includes('Raining')):
        icon = rain;
        break;
      case (weather.includes('Snow') || weather.includes('Snowing')):
        icon = snow;
        break;
      case (weather.includes('Wind') || weather.includes('Windy')):
        icon = wind;
        break;
      case (weather.includes('Clear') || weather.includes('Sunny')):
        icon = sun;
        break;
      default:
        break;
    }
  }

  return (
    <div className="icon">
      <img src={icon} alt="weather icon" />
    </div>
  );
};

export const ForecastDisplay = ({lat, lon}) => {
  const [forecast, setForecast] = useState(null);

  const params = `lat=${lat}&lon=${lon}`;
  const url = `${process.env.REACT_APP_OPEN_WEATHER_URL}forecast?${params}&units=metric&appid=${process.env.REACT_APP_API_KEY}`;

  useEffect(() => {
    const fetchForecast =  async () => {
      const res = await axios.get(url);
      const {list} = res.data;
      const now = new Date(Date.now());

      if (res.status === 200) {
        const current = list.filter(({dt}) => {
          const dtToUTCDate = new Date(dt * 1000).getUTCDate();
          const dtToUTCHrs = new Date(dt * 1000).getUTCHours();
          const dateNow = now.getDate();
          const timeNow = now.getHours();
          const isToday = dateNow === dtToUTCDate;
  
          return isToday && (timeNow < dtToUTCHrs);
        });
        setForecast(current.slice(0, 3));
      }
    }
    fetchForecast();
  }, [url])

  return (
    <div className="forecast-display">
      {
        forecast && forecast.length ? (
          forecast.map(({dt_txt, main, weather}) => {
            const day = new Intl.DateTimeFormat('en-US', {hour: 'numeric'})
              .format(new Date(dt_txt))
              .replace(',', ' ')
              .padStart(5, '0');
  
            return (
              <div key={dt_txt} className="item">
                <span>{day}</span>
                <Icon weather={weather[0].main} />
                <span>{Math.floor(main.temp)}&deg;</span>
              </div>
            );
          })
        ) : <span className="item block">That's all for today!</span>
      }
    </div>
  );
};
