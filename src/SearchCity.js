import React from "react";
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import UilSnowflake from '@iconscout/react-unicons/icons/uil-snowflake';
import UilSun from '@iconscout/react-unicons/icons/uil-sun';
import UilRain from '@iconscout/react-unicons/icons/uil-raindrops';
import UilCloudy from '@iconscout/react-unicons/icons/uil-clouds';
import UilWarm from '@iconscout/react-unicons/icons/uil-cloud-sun';

// Open Weather API Key
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

// Data for holding forecast info.
const cnt = 40;
const tempCard = {
    day: null,
    temp: null,
    high_temp: null,
    low_temp: null,
    icon: null,
}
var tempCards = [];
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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

        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&cnt=${cnt}&appid=${API_KEY}&units=imperial`);
        const forecastData = await forecastResponse.json();

        console.log(forecastData);

        // Empty temperature cards array
        tempCards = [];

        // Fill array with temperature data cards
        for (let i = 0; i < cnt; i++) {
            let currTempCard = Object.create(tempCard);
            let tempData = forecastData.list[i].main;
            currTempCard.day = days[new Date(forecastData.list[i].dt * 1000).getDay()];            ;
            currTempCard.temp = tempData.temp;
            currTempCard.high_temp = tempData.temp_max;
            currTempCard.low_temp = tempData.temp_min;

            if (forecastData.list[i].weather[0].main == "Rain") {
                currTempCard.icon = <UilRain size="100" color="#61DAFB" />
            } else {
                if (tempData.temp < 30) {
                    currTempCard.icon = <UilSnowflake size="100" color="#61DAFB" />
                } else if (tempData.temp < 50) {
                    currTempCard.icon = <UilCloudy size="100" color="#61DAFB" />
                } else if (tempData.temp < 70) {
                    currTempCard.icon = <UilWarm size="100" color="#61DAFB" />
                } else if (tempData.temp < 90) {
                    currTempCard.icon = <UilSun size="100" color="#61DAFB" />
                } else {
                    currTempCard.icon = <UilSun size="100" color="#61DAFB" />
                }
            }

            tempCards.push(currTempCard);
        }

        // Send this data to GetWeatherData
        this.props.onCitySubmit(city_name);
        this.props.onLatLonChange(data.coord.lat, data.coord.lon);
        this.props.onTempChange(data.main.temp);

        // Send this data to GetTempData
        this.props.onTempCardsChange(tempCards);
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
                <Input type="text" value={this.props.citysearch} onChange={this.handleChange} placeholder="City Name" fullWidth={true} size="medium" />
                <br/>
                <br/>
                <Button type="submit" variant='contained' endIcon={<SearchIcon />}>Search</Button>
            </form>
        );
    }
}

export default SearchCity;