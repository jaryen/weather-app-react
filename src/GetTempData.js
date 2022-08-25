import React from "react";

// Open Weather API Key
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

class GetTempData extends React.Component {
    constructor(props) {
        super(props);

        this.handleTempChange = this.handleTempChange.bind(this);
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
                        this.handleTempChange(json.main.temp);
                        this.props.onDataLoaded();
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
    }

    handleTempChange(temp) {
        this.props.onTempChange(temp);
    }

    render() {
        if (!this.props.dataIsLoaded) {
            return (
                <p>Please wait...</p>
            )
        } else {
            return(
                <div>
                    <p>Current Temperature: {this.props.temp}</p>
                </div>
            );
        }
    }
}

export default GetTempData;