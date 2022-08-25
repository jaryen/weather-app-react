import React from "react";

// Open Weather API Key
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

class GetWeatherData extends React.Component {
    constructor(props) {
        super(props);

        this.handleLatLonChange = this.handleLatLonChange.bind(this);
    }

    componentDidMount() {
        let locPromise = new Promise(function(resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        locPromise
            .then((value) => {
                let lat = value.coords.latitude;
                let lon = value.coords.longitude;
                this.handleLatLonChange(lat, lon);

                // Get current city name based off lat and lon.
                fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
                    .then(res => res.json())
                    .then(json => {
                        this.props.onCityChange(json[0].name);
                    })
                    .catch(err => console.error(err));

                this.props.onDataLoaded();
            })
            .catch(err => console.error(err));
    }

    handleLatLonChange(lat, lon) {
        this.props.onLatLonChange(lat, lon);
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
                    <p>Current City Name: {this.props.cityname}</p>
                </div>
            );
        }
    }
}

export default GetWeatherData;