import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import Container from '@mui/material/Container';

// Open Weather API Key
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

class SearchCity extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Search City API Call
    async searchCity(city_name) {
        console.log("City Searched: " + city_name);
        
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}&units=imperial`);
        const data = await response.json();

        // Send this data to GetWeatherData
        this.props.onCitySubmit(city_name);
        this.props.onLatLonChange(data.coord.lat, data.coord.lon);
        this.props.onTempChange(data.main.temp);
    }

    handleChange(event) {
        this.props.onCitySearchChange(event.target.value);
    }

    handleSubmit(event) {
        this.searchCity(this.props.citysearch);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Box 
                sx={{
                    m: 5,
                    ml: 15,
                    mr: 15,
                    p: 4,
                    borderRadius: 2, 
                    bgcolor: 'rgba(167, 192, 205, 0.5)',
                }}>
                    <Input type="text" value={this.props.citysearch} onChange={this.handleChange} placeholder="City Name" />
                    <input type="submit" value="Submit" />                    
                </Box>
            </form>
        );
    }
}

export default SearchCity;