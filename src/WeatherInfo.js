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
            citysearch: null,
            currcity: null,
            temp: null,
            dataIsLoaded: false,
        };

        this.handleCitySearchChange = this.handleCitySearchChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleLatLonChange = this.handleLatLonChange.bind(this);
        this.handleTempChange = this.handleTempChange.bind(this);
        this.handleDataLoadedChange = this.handleDataLoadedChange.bind(this);
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
                    citysearch={this.state.citysearch} 
                    onCitySearchChange={this.handleCitySearchChange}
                    onCitySubmit={this.handleCityChange}
                    onLatLonChange={this.handleLatLonChange}
                    onTempChange={this.handleTempChange} />
                <GetWeatherData 
                    lat={this.state.lat}
                    lon={this.state.lon}
                    cityname={this.state.currcity}
                    temp={this.state.temp}
                    dataIsLoaded={this.state.dataIsLoaded}
                    onDataLoaded={this.handleDataLoadedChange}
                    onCityChange={this.handleCityChange}
                    onLatLonChange={this.handleLatLonChange}
                    onTempChange={this.handleTempChange} />
            </div>
        );
    }   
}

export default WeatherInfo;