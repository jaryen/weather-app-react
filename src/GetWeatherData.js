import React from "react";
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

                // Get the forecast based off lat and lon.
                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=${cnt}&appid=${API_KEY}&units=imperial`)
                    .then(res => res.json())
                    .then(json => {
                        console.log(json);

                        // Empty temperature cards array
                        tempCards = [];

                        // Fill array with temperature data cards
                        for (let i = 0; i < cnt; i++) {
                            let currTempCard = Object.create(tempCard);
                            let tempData = json.list[i].main;
                            currTempCard.day = days[new Date(json.list[i].dt * 1000).getDay()];
                            currTempCard.temp = tempData.temp;
                            currTempCard.high_temp = tempData.temp_max;
                            currTempCard.low_temp = tempData.temp_min;

                            if (json.list[i].weather[0].main == "Rain") {
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

                        this.props.onTempCardsChange(tempCards);
                    });

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
                    <p>Coordinates: {this.props.lat}, {this.props.lon}</p>
                    <p>Current City Name: {this.props.cityname}</p>
                </div>
            );
        }
    }
}

export default GetWeatherData;