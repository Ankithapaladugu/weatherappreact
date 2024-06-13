import React, { useState } from 'react';
import axios from 'axios';
import Lottie from 'lottie-react';
import './App.css';
import sunnyAnimation from './animations/sunny.json';
import cloudyAnimation from './animations/cloudy.json';
import rainyAnimation from './animations/rainy.json';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:5000/api/weather', {
        params: { city },
      });
      setWeather(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      setError('Failed to fetch weather data. Please try again.');
      setWeather(null);
    }
  };

  // Function to get the appropriate animation based on weather description
  const getWeatherAnimation = (description) => {
    if (description.includes('drizzle') || description.includes('rain')) {
      return rainyAnimation;
    } else if (description.includes('cloud')) {
      return cloudyAnimation;
    } else {
      return sunnyAnimation;
    }
  };

  // Function to format the time
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${strMinutes} ${ampm}`;
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Weather App</h1>
        <form onSubmit={fetchWeather}>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Get Weather</button>
        </form>
        {error && <p className="error">{error}</p>}
        {weather && (
          <div>
            <h2>{weather.city}</h2>
           
            <p>Temperature: {weather.temperature}°C</p>
            <p>Description: {weather.description}</p>
            <div className="weather-animation">
              <Lottie animationData={getWeatherAnimation(weather.description)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
