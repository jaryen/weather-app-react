import React from "react";

// Open Weather API Key
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

class SearchCity extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lat: null,
            lon: null,
            temp: null,
            dataIsLoaded: false,
        };
    }

    componentDidMount() {
        let city_name = document.getElementById("cityname").value;

        // Call API with city name
        let data = fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city_name}&limit=5&appid=${API_KEY}&units=imperial`)
            .then(res => res.json())
            .then(json => {
                this.setState({
                    temp: json.main.temp,
                    dataIsLoaded: true,
                });
            })
            .catch(err => console.error(err));
          
        console.log(data);
    }

    render() {
        return (
            <form id="searchCityForm">
                <label for="cityname">Enter City Name:</label><br></br>
                <input type="text" name="cityname" id="cityname" placeholder="Enter City Name"></input>
                <input type="submit" name="submit" value="Submit" onClick={searchCity}></input>
            </form>
        );
    }
}

function searchCity() {
    document.querySelector("searchCityForm").addEventListener("keyup", function() {
        var data;
        var input = document.querySelectorAll('input');
        data = input.value;
        console.log(data);
    });
}

export default SearchCity;