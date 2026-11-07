import { useEffect, useState } from "react";
import { getCurrentWeather, getCurrentWeatherByCords, getWeatherForecast,  } from "../services/weatherAPI";


export const useWeather = () => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] =  useState(null);
    const [unit, setUnit] =  useState("C");  


    const fetchWeatherByCity = async (city) => {
        setLoading(true);
        setError(null);

        try{
            const[weatherData, foreCast] = await Promise.all([
                getCurrentWeather(city),
                getWeatherForecast(city),
            ]);
            setCurrentWeather(weatherData);
            setForecast(foreCast);
        } catch (error) {
            setError(error instanceof Error ? error.message : "An unknown error occurred.");
        }
        finally {
            setLoading(false);
        }
    }


    const fetchWeatherByLocation = async () => {
        if(!navigator.geolocation){
            setError("Geolocation is not supported by your browser.");
            return;
        }

        setLoading(true);
        setError(null);

        navigator.geolocation.getCurrentPosition(async (position) => {
            try {
                const { latitude, longitude } = position.coords;
                const weatherData = await getCurrentWeatherByCords(
                    latitude,
                    longitude
                )
                setCurrentWeather(weatherData);

                // also fetch forecast for the current location
                const forecast  = await getWeatherForecast(weatherData.name);
                setForecast(forecast);
                
            } catch (error) {
                setError(error instanceof Error ? error.message : "An unknown error occurred.");
            } finally{
                setLoading(false);
            } 
         }, (error) => {
            setError("Unable to retrieve your location. Please allow location access and try again.");
            setLoading(false);
         });
    }

    const toggleUnit = () => {
        setUnit(unit === "C" ? "F" : "C");
    }

    // load default weather data for a default city (e.g., "Nyeri") on initial load
    useEffect(() => {
        fetchWeatherByCity("Nyeri");
    });

    return {
        currentWeather,
        forecast,
        loading,
        error,
        unit,
        toggleUnit,
        fetchWeatherByCity,
        fetchWeatherByLocation,
    };
}

  
