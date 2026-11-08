import { useEffect, useState } from "react";
import { getCurrentWeather, getCurrentWeatherByCords, getWeatherForecast,  } from "../services/weatherAPI";

const WEATHER_CACHE_TTL = 10 * 60 * 1000;
const weatherCache = new Map();
const weatherRequests = new Map();

export const useWeather = () => {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] =  useState(null);
    const [unit, setUnit] =  useState("C");  


    const fetchWeatherByCity = async (city) => {
        const normalizedCity = city.trim().toLowerCase();
        const cachedWeather = weatherCache.get(normalizedCity);

        if (cachedWeather && Date.now() - cachedWeather.timestamp < WEATHER_CACHE_TTL) {
            setCurrentWeather(cachedWeather.weather);
            setForecast(cachedWeather.forecast);
            setError(null);
            return;
        }

        const existingRequest = weatherRequests.get(normalizedCity);
        if (existingRequest) {
            setLoading(true);
            setError(null);

            try {
                const { weather, forecast } = await existingRequest;
                setCurrentWeather(weather);
                setForecast(forecast);
            } catch (error) {
                setError(error instanceof Error ? error.message : "An unknown error occurred.");
            } finally {
                setLoading(false);
            }
            return;
        }

        setLoading(true);
        setError(null);

        const request = Promise.all([
            getCurrentWeather(city),
            getWeatherForecast(city),
        ]).then(([weather, forecast]) => {
            weatherCache.set(normalizedCity, {
                weather,
                forecast,
                timestamp: Date.now(),
            });
            return { weather, forecast };
        });

        weatherRequests.set(normalizedCity, request);

        try {
            const { weather, forecast } = await request;
            setCurrentWeather(weather);
            setForecast(forecast);
        } catch (error) {
            setError(error instanceof Error ? error.message : "An unknown error occurred.");
        } finally {
            weatherRequests.delete(normalizedCity);
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
    }, []);

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

  
