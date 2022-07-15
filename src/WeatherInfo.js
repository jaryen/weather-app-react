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
        this.handleTempChange = this.handleTempChange.bind(this);
    }

    handleCityChange(cityname) {
        this.setState({currcity: cityname});
    }

    handleTempChange(temp) {
        this.setState({temp: temp});
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
                    dataIsLoaded={this.state.dataIsLoaded} />
            </div>
        );
        
    }   
}

export default WeatherInfo;