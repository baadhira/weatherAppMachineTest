

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'
const apiKey = '992c58cab1c3536204f075ff1020548b'; 
const App = ({ city }) => {
  const [hourlyData, setHourlyData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
const [error,setError]= useState();
  
  useEffect(()=>{
  const fetchWeatherDataCurrent = async (city) => {
    try {
      setError('')
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Cochin&appid=${apiKey}&units=metric`);
      
      setCurrentData(response.data);
      console.log(response.data,'response.data')
      // setWeather(response.data);
    } catch (error) {
      console.error('Failed to fetch weather data', error);
      setError(error?.message);
    }
  };
  fetchWeatherDataCurrent()
},[])
  useEffect(() => {
    const fetchHourlyWeather = async () => {
      try {
        setError('')
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${apiKey}`);
        setHourlyData(response.data.list);
      } catch (error) {
        setError(error?.message);
        console.error('Failed to fetch hourly weather data', error);
      }
    };

    fetchHourlyWeather();
  }, [city]);

  const convertUnixTo12HourTime = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const getHourLabel = (unixTimestamp) => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const date = new Date(unixTimestamp * 1000);
    const hours = date.getHours();
    return hours === currentHour ? 'Now' : convertUnixTo12HourTime(unixTimestamp);
  };
  return (
    <>
    {error?<h1>{error}</h1>:
    <>
    <div className='mainContainer'>
    <div className='container'>
      <p >Today</p>
      <h1>{convertUnixTo12HourTime(currentData.dt)} </h1>
      <div className='rowContainer'>
      {currentData?.weather && currentData.weather[0]?.icon && (
    <img
      src={`http://openweathermap.org/img/wn/${currentData.weather[0].icon}.png`}
      alt={currentData.weather[0].description}
    />
  )}
      {/* <img
              src={`http://openweathermap.org/img/wn/${currentData?.weather[0]?.icon}.png`}
              alt={currentData?.weather[0]?.description}
            /> */}
            <h1 className='textStyle'>{currentData?.main?.temp} °C</h1></div>
            {currentData?.weather && currentData.weather[0]?.icon && <h4>{currentData?.weather[0]?.description}</h4>}
      <h4>{currentData?.name}</h4>
      <h4>Sunrise :  {convertUnixTo12HourTime(currentData?.sys?.sunrise)}</h4>
      <h4>Sunrise :  {convertUnixTo12HourTime(currentData?.sys?.sunset)}</h4>
      


    </div>
    <div className='customContainer'>
      <div className='flexContainer'>

    {hourlyData.slice(0, 6).map((hour, index) => (
          <div key={index}  className='marginStyle'>
            <p>{getHourLabel(hour.dt)}</p>
            <p> {(hour.main.temp/10).toFixed(2)} °C</p>
            {hour?.weather && hour.weather[0]?.icon &&<img
              src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
              alt={hour.weather[0].description}
            />}
          </div>
        ))}
      </div>

      <hr className="my-8" />

      <div className='flexContainer'>

      {hourlyData.slice(6, 12).map((hour, index) => (
          <div key={index} className='marginStyle'>
            <p>{convertUnixTo12HourTime(hour.dt)}</p>
            {hour?.weather && hour.weather[0]?.icon &&  <img
              src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
              alt={hour.weather[0].description}
              className="w-12 h-12"
            />}
            <p>{(hour.main.temp/10).toFixed(2)} °C</p>
          </div>
        ))}
  </div>
     
    </div>
   
   </div>
</>}
    </>
  );
};

export default App;

