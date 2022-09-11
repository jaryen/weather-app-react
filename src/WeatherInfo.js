import React from "react";
import GetWeatherData from './GetWeatherData';
import SearchCity from './SearchCity';
import GetTempData from './GetTempData';
import Box from '@mui/material/Box';

// Data for holding forecast info.
/* const cnt = 5;
const tempCard = {
    day: null,
    temp: null,
    high_temp: null,
    low_temp: null,
}
var tempCards = []; */

class WeatherInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lat: null,
            lon: null,
            citysearch: '',
            currcity: null,
            temp: null,
            tempCards: [],
            dataIsLoaded: false
        };

        this.handleCitySearchChange = this.handleCitySearchChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleLatLonChange = this.handleLatLonChange.bind(this);
        this.handleTempChange = this.handleTempChange.bind(this);
        this.handleDataLoadedChange = this.handleDataLoadedChange.bind(this);
        this.handleTempCardsChange = this.handleTempCardsChange.bind(this);
    }

    // Saves the current city name typed in SearchCity
    // to the parent class.
    handleCitySearchChange(searchname) {
        this.setState({citysearch: searchname});
    }

    // Handles setting the current city name
    // to parent city name.
    handleCityChange(cityname) {
        this.setState({currcity: cityname});
    }

    // Handles setting the current latitude and
    // longitude
    handleLatLonChange(lat, lon) {
        this.setState({
            lat: lat,
            lon: lon,
        });
    }

    // Handles setting the temperature in
    // the city searched
    handleTempChange(temp) {
        this.setState({temp: temp});
    }

    handleTempCardsChange(tempCards) {
        this.setState({tempCards: tempCards});
    }

    // Handles when weather data is loaded
    // and changes dataIsLoaded to true.
    handleDataLoadedChange() {
        this.setState({dataIsLoaded: true});
    }

    render() {
        return (
            <div id="weatherInfoDiv">
                <Box 
                    sx={{
                        mb: 3,
                        p: 5,
                        borderRadius: 2, 
                        bgcolor: 'rgba(167, 192, 205, 0.5)',
                    }}
                >
                    <SearchCity
                        citysearch={this.state.citysearch} 
                        onCitySearchChange={this.handleCitySearchChange}
                        onCitySubmit={this.handleCityChange}
                        onLatLonChange={this.handleLatLonChange}
                        onTempChange={this.handleTempChange} 
                        onTempCardsChange={this.handleTempCardsChange}
                    />
                    <GetWeatherData 
                        lat={this.state.lat}
                        lon={this.state.lon}
                        cityname={this.state.currcity}
                        temp={this.state.temp}
                        dataIsLoaded={this.state.dataIsLoaded}
                        onDataLoaded={this.handleDataLoadedChange}
                        onCityChange={this.handleCityChange}
                        onLatLonChange={this.handleLatLonChange}
                        onTempChange={this.handleTempChange} 
                        onTempCardsChange={this.handleTempCardsChange}
                    />
                </Box>
                <GetTempData 
                    lat={this.state.lat}
                    lon={this.state.lon}
                    temp={this.state.temp}
                    tempCards={this.state.tempCards}
                    dataIsLoaded={this.state.dataIsLoaded}
                    onDataLoaded={this.handleDataLoadedChange}
                    onTempChange={this.handleTempChange} 
                />
            </div>
        );
    }   
}

export default WeatherInfo;