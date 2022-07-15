import './App.css';
import React from 'react';
import GetWeatherData from './GetWeatherData';
import SearchCity from './SearchCity';
import WeatherInfo from './WeatherInfo';

class App extends React.Component {
  // Used for HTML + JSX
  render() {
    return (
      <div className='App'>
        <h1>Weather Data</h1>
        <WeatherInfo />
      </div>
    );
  }
}

export default App;
