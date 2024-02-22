const API_KEY = "e54b5a96f406052213bef82a02509133";

let fetchWeatherData = async (city) => {
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        console.log(data.main.temp);
        return data;
    } catch (error) {
        console.error("Error fetching weather data", error);
        return null;
    }
};

let temperature;
let location;
let humidity;
let windSpeed;

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector('input[name="search_input"]');
    const searchButton = document.querySelector("button");
    const weatherIcon = document.querySelector(".weather_icon");
    temperature = document.querySelector(".temp");

    location = document.querySelector(".location");
    humidity = document.querySelector(".humidity");
    windSpeed = document.querySelector(".wind");

    searchButton.addEventListener("click", async () => {
        const city = searchInput.value.trim();

        // Ask to sir how to set default location
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
        });
        if (city) {
            const data = await fetchWeatherData(city);
            console.log(data);
            if (data) {
                updateUi(data);
            }
        }
    });
    function updateUi(data) {
        temperature.textContent = `${data.main.temp}°C`;
        location.textContent = data.name;
        humidity.textContent = data.main.humidity;
        windSpeed.textContent = data.wind.speed;
    }
});
