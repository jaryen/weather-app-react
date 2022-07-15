import React from "react";

// Open Weather API Key
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

class GetWeatherData extends React.Component {
    constructor(props) {
        super(props);

        /* this.state = {
            lat: null,
            lon: null,
            currcity: null,
            temp: null,
            dataIsLoaded: false,
        }; */
    }

    componentDidMount() {
        let locPromise = new Promise(function(resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        locPromise
            .then((value) => {
                let lat = value.coords.latitude;
                let lon = value.coords.longitude;

                // Get weather based off lat and lon.
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`)
                    .then(res => res.json())
                    .then(json => {
                        this.setState({
                            lat: lat,
                            lon: lon,
                            temp: json.main.temp,
                            dataIsLoaded: true,
                        });
                    })
                    .catch(err => console.error(err));

                // Get current city name based off lat and lon.
                fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
                    .then(res => res.json())
                    .then(json => {
                        this.setState({currcity: json[0].name});
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
    }

    render() {
        if (!this.props.dataIsLoaded) {
            return (
                <p>Please wait...</p>
            )
        } else {
            return(
                <div>
                    <p>Current Coordinates: {this.props.lat}, {this.props.lon}</p>
                    <p>Current City: {this.props.cityname}</p>
                    <p>Current Temperature: {this.props.temp}</p>
                </div>
            );
        }
    }
}

export default GetWeatherData;