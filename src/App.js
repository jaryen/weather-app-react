import './App.css';
import React from 'react';
import WeatherInfo from './WeatherInfo';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

// Theme
const theme = createTheme({
  palette: {
      primary: {
          main: grey[800],
      },
  },
});

class App extends React.Component {
  // Used for HTML + JSX
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className='App'>
          <h1>Weather App</h1>
          <WeatherInfo />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
