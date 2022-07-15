import React from "react";

// Open Weather API Key
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

class SearchCity extends React.Component {
    constructor(props) {
        super(props);

        /* this.state = {
            temp: null,
            dataIsLoaded: false,
            cityname: '',
        }; */

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // API Call
    async searchCity(city_name) {
        console.log("City Name: " + city_name);
        
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}&units=imperial`);
        const data = await response.json();
        
        /* this.setState({
            temp: data.main.temp,
            dataIsLoaded: true,
        }); */

        
        
        console.log(data);
    }

    handleChange(event) {
        // this.setState({cityname: event.target.value});
        this.props.onCityChange(event.target.value);
    }

    handleSubmit(event) {
        console.log(this.props.cityname);
        this.searchCity(this.props.cityname);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Enter City Name:
                    <br />
                    <input type="text" value={this.props.cityname} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default SearchCity;