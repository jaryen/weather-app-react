import React from "react";
import GetWeatherData from "./GetWeatherData";

class GetCoords extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: null,
            lon: null,
        };
    }

    componentDidMount() {
        let locPromise = new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            } else {
                reject("This browser does not support geolocation");
            }
        });

        locPromise.then((value) => {
            let latProm = value.coords.latitude;
            let lonProm = value.coords.longitude;
            this.setState({lat: latProm, lon: lonProm});
        }).catch((err) => {
            console.error(err);
        });
    }

    render() {
        return(
            <div>
                <p>Current Location: {this.state.lat}, {this.state.lon}</p>
                <GetWeatherData lat={this.state.lat} lon={this.state.lon} />
            </div>
        );
    }
}

export default GetCoords;