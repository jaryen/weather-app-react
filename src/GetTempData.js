import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

// Open Weather API Key
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const tempTextStyle = {
    color: "white",
}

const tempCard = {
    day: null,
    temp: null,
    high_temp: null,
    low_temp: null,
}
var tempCards = [];

const cnt = 5;

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
                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=${cnt}&appid=${API_KEY}&units=imperial`)
                    .then(res => res.json())
                    .then(json => {
                        this.handleTempChange(json.list[3].main.temp);
                        this.props.onDataLoaded();

                        tempCards = [];
                        for (let i = 0; i < cnt; i++) {
                            let currTempCard = Object.create(tempCard);
                            let tempData = json.list[i].main;
                            currTempCard.day = json.list[i].dt_txt;
                            currTempCard.temp = tempData.temp;
                            currTempCard.high_temp = tempData.temp_max;
                            currTempCard.low_temp = tempData.temp_min;
                            tempCards.push(currTempCard);
                        }

                        console.log(tempCards);
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
                // <div>
                //     <p style={tempTextStyle}>Current Temperature: {this.props.temp}</p>
                // </div>
                <Grid direction="rows" container columns={5} spacing={5}>
                    {tempCards.map(function(tempCard) {
                        return(
                            <Card
                                sx={{
                                    width: 1/5,
                                    bgcolor: 'primary.main',
                                    boxShadow: 3
                                }} 
                            >
                                <CardContent>
                                    <Typography style={tempTextStyle}>
                                        Date: {tempCard.day} <br/>
                                        Temperature: {tempCard.temp} <br/>
                                        High: {tempCard.high_temp} <br/>
                                        Low: {tempCard.low_temp} 
                                    </Typography>
                                </CardContent>
                            </Card>
                        );
                    })}
                </Grid>
            );
        }
    }
}

export default GetTempData;