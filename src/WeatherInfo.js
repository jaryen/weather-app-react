import React from "react";
import GetWeatherData from './GetWeatherData';
import SearchCity from './SearchCity';

// Open Weather API Key
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

class WeatherInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lat: null,
            lon: null,
            currcity: null,
            temp: null,
            dataIsLoaded: false,
        };

        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleLatLonChange = this.handleLatLonChange.bind(this);
        this.handleTempChange = this.handleTempChange.bind(this);
        this.handleDataLoadedChange = this.handleDataLoadedChange.bind(this);
    }

    // Sets the city name in the parent class
    // to the city name typed in SearchCity
    handleCityChange(cityname) {
        this.setState({currcity: cityname});
    }

    handleLatLonChange(lat, lon) {
        this.setState({
            lat: lat,
            lon: lon,
        });
    }

    handleTempChange(temp) {
        this.setState({temp: temp});
    }

    // Handles when weather data is loaded
    // and changes dataIsLoaded to true.
    handleDataLoadedChange() {
        this.setState({dataIsLoaded: true});
    }

    render() {
        return (
            <div>
                <SearchCity
                    cityname={this.state.currcity} 
                    onCityChange={this.handleCityChange}
                    onTempChange={this.handleTempChange} />
                <GetWeatherData 
                    lat={this.state.lat}
                    lon={this.state.lon}
                    cityname={this.state.currcity}
                    temp={this.state.temp}
                    dataIsLoaded={this.state.dataIsLoaded}
                    onDataLoaded={this.handleDataLoadedChange}
                    onLatLonChange={this.handleLatLonChange}
                    onTempChange={this.handleTempChange} />
            </div>
        );
    }   
}

export default WeatherInfo;