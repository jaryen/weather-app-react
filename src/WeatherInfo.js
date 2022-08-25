import React from "react";
import GetWeatherData from './GetWeatherData';
import SearchCity from './SearchCity';
import GetTempData from './GetTempData';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


class WeatherInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lat: null,
            lon: null,
            citysearch: '',
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
            <div id="weatherInfoDiv">
                <Box 
                    sx={{
                        mb: 2,
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
                    />
                </Box>
                <Card
                    sx={{
                        width: 1/5
                    }}>
                    <CardContent>
                        <GetTempData 
                            lat={this.state.lat}
                            lon={this.state.lon}
                            temp={this.state.temp}
                            dataIsLoaded={this.state.dataIsLoaded}
                            onDataLoaded={this.handleDataLoadedChange}
                            onTempChange={this.handleTempChange} 
                        />
                    </CardContent>
                </Card>
            </div>
        );
    }   
}

export default WeatherInfo;