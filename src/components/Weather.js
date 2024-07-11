import React from 'react';

const Weather = ({ weather }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold">{weather.name}</h2>
      <p>Temperature: {weather.main.temp} °C</p>
      <p>Description: {weather.weather[0].description}</p>
      <img
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
        alt={weather.weather[0].description}
      />
    </div>
  );
};

export default Weather;
