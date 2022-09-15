import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import UilSun from '@iconscout/react-unicons/icons/uil-sun';
import UilRain from '@iconscout/react-unicons/icons/uil-raindrops';
import UilCloudy from '@iconscout/react-unicons/icons/uil-clouds';
import UilWarm from '@iconscout/react-unicons/icons/uil-cloud-sun';


// Open Weather API Key
// const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const tempTextStyle = {
    color: "white",
}

/* const tempCard = {
    day: null,
    temp: null,
    high_temp: null,
    low_temp: null,
}
var tempCards = []; */

const cnt = 5;

class GetTempData extends React.Component {
    /* constructor(props) {
        super(props);
    } */

    /* componentDidMount() {
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
                        this.props.onDataLoaded();

                        tempCards = [];

                        // Fill array with temperature data cards
                        for (let i = 0; i < cnt; i++) {
                            let currTempCard = Object.create(tempCard);
                            let tempData = json.list[i].main;
                            currTempCard.day = json.list[i].dt_txt;
                            currTempCard.temp = tempData.temp;
                            currTempCard.high_temp = tempData.temp_max;
                            currTempCard.low_temp = tempData.temp_min;
                            tempCards.push(currTempCard);
                        }

                        // console.log(tempCards);
                    })
                    .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
    } */

    render() {
        if (!this.props.dataIsLoaded) {
            return (
                <p>Please wait...</p>
            )
        } else {
            return(
                <Grid container justifyContent="space-evenly" columns={cnt} spacing={2}>
                    {/* Take each object in tempCards arr and create
                    a new Card component out of them.
                    Return an array of card components */}
                    {this.props.tempCards.map(function(tempCard) {
                        return(
                            <Grid item>
                                <Card
                                    sx={{
                                        bgcolor: 'primary.main',
                                        boxShadow: 3,
                                    }} 
                                >
                                    {tempCard.icon}
                                    <CardContent>
                                        <Typography style={tempTextStyle}>
                                            Date: {tempCard.day} <br/>
                                            Temperature: {tempCard.temp} <br/>
                                            High: {tempCard.high_temp} <br/>
                                            Low: {tempCard.low_temp} 
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            );
        }
    }
}

export default GetTempData;