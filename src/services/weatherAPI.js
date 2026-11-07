const API_KEY = "62004925bf22b7290bfb0ef742fd6428";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}";
const GEO_URL = "https://api.openweathermap.org/geo/1.0/direct?q={city name}&limit=5&appid={API key}";

export const getCurrentWeather = async (city) =>{
    try {
        const response = await fetch(`${BASE_URL}/weather?q=${city}&appid=${API_KEY} &units=metric`)

        if (!response.ok) {
             if (response.status === 404) {
                throw new Error("City not found. Please check the city name and try again.");
             } else if (response.status === 401) {
                throw new Error("Invalid API key. Please check your API key and try again.");
             } else {
                throw new Error("Failed to fetch current weather data. Please try again later.");
             }
        }  

        const data = await response.json();

        // ensure we have the correct timestamp if not provided
              if (!data.dt) {
                data.dt = Math.floor(Date.now() / 1000);
              }

              return data;

    } catch (error) {
      if (error instanceof TypeError && error.message.includes("fetch")) {
        throw new Error("Network error. Please check your internet connection and try again.");
      }
    }
     throw error;
   
};

export const getCurrentWeatherByCords = async (lat, lon) => {
    try {
    
        const response = await fetch(
            `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

      
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("Invalid API key. Please check your API key.");
            } else if (response.status === 404) {
                throw new Error("Location not found for these coordinates.");
            } else {
                throw new Error("Failed to fetch current weather data. Please try again later.");
            }
        }

        const data = await response.json();

        // Ensure we have the correct timestamp if not provided
        if (!data.dt) {
            data.dt = Math.floor(Date.now() / 1000);
        }

        return data;

    } catch (error) {
        // 3. Handle and re-throw clearly
        if (error instanceof TypeError && error.message.includes("fetch")) {
            throw new Error("Network error. Please check your internet connection and try again.");
        }
        throw error; // Re-throw the actual Error object so it bubbles up to your component
    }
};

export const  getWeatherForecast = async (city) => {
    try {
        
        const response = await fetch(
            `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("Invalid API key. Please check your API key.");
            } else if (response.status === 404) {
                throw new Error("Location not found for these coordinates.");
            } else {
                throw new Error("Failed to fetch current weather data. Please try again later.");
            }
        }

        const data = await response.json();

        // Ensure we have the correct timestamp if not provided
        if (!data.dt) {
            data.dt = Math.floor(Date.now() / 1000);
        }

        return data;

    } catch (error) {
        // 3. Handle and re-throw clearly
        if (error instanceof TypeError && error.message.includes("fetch")) {
            throw new Error("Network error. Please check your internet connection and try again.");
        }
        throw error; // Re-throw the actual Error object so it bubbles up to your component
    }
};