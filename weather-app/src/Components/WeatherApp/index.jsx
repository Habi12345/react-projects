import React, { useState, useEffect } from 'react'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// Imported icons
import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import cloud_icon from '../Assets/cloud.png'
import drizzle_icon from '../Assets/drizzle.png'
import humidity_icon from '../Assets/humidity.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'

// API key
const api_key = "38930843f10c4fa62a388f78da650272";

//WeatherComponent
const index = () => {
    // Define the state variables
    const [city, setCity] = useState("");
    const [temperature, setTemperature] = useState("");
    const [location, setLocation] = useState("");
    const [humidity, setHumidity] = useState("");
    const [windSpeed, setWindSpeed] = useState("");
    const [feelsLike, setFeelsLike] = useState("");
    const [weatherIcon, setIcon] =  useState(cloud_icon);

    // Search function
    const search = async () => {
        // Checking if the input is empty
        if (city === "") {
            return ;
        }

        //API URL
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;

        // Fetch data from the API
        const response = await fetch(url);
        const data = await response.json();

        // Updating the use state variables
        setTemperature(prevTemperature => Math.round(data.main.temp) + "°C");
        setLocation(prevLocation => data.name);
        setCity("");
        setHumidity(prevHumidty => data.main.humidity + "%");
        setWindSpeed(prevWindSpeed => data.wind.speed + " m/s");
        setFeelsLike(prevFeelsLike => Math.round(data.main.feels_like) + "°C");

        if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
            setIcon(prevIcon => clear_icon);
        }else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
            setIcon(prevIcon => cloud_icon)
        }else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
            setIcon(prevIcon => drizzle_icon)
        }else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
            setIcon(prevIcon => rain_icon)
        }else if(data.weather[0].icon==="010d" || data.weather[0].icon==="010n"){
            setIcon(prevIcon => rain_icon)
        }else if(data.weather[0].icon==="013d" || data.weather[0].icon==="013n"){
            setIcon(prevIcon => snow_icon)
        }else{
            setIcon(clear_icon)
        }
    }

    //input change handler
    const handleInputChange = (event) => {
        setCity(event.target.value);
    }

    // Using the useEffect hook to call the search function when the component mounts
    useEffect(() => {
        search();
    }, []);

    return (
        <div className='container'>
            <div className='card'>
                <div className='card-body'>
                    <div className='top'>
                        <input type="text" className='cityInput' placeholder='Search City' value={city} onChange={handleInputChange} />
                        <div className='search-icon' onClick={() => { search() }}>
                            <img src={search_icon} />
                        </div>
                    </div>
                    <div className='middle'>
                        <h6 className='weather-temp'>{temperature}</h6>
                        <span className='weather-location'>{location}</span>
                    </div>
                    <div className='bottom'>
                        <div className='elements'>
                            <div className="data">
                                <div className="text">
                                    <img src={humidity_icon} alt="" />
                                    <div>Humidity</div>
                                </div>
                                <div className="humidity-percent">{humidity}</div>
                            </div>
                            <div className="data">
                                <div className="text">
                                    <img src={wind_icon} alt="" />
                                    <div>Wind Speed</div>
                                </div>
                                <div className="wind-speed">{windSpeed}</div>
                            </div>
                            <div className="data">
                                <div className="text">Feels Like</div>
                                <div className="feelslike">{feelsLike}</div>
                            </div>
                        </div>
                        <div className='weather-image'>
                            <img src={weatherIcon} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default index