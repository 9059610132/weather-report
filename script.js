const apiKey = 'ce5f4334a0279931c1cab970b74eed80'; // Replace with your API key
const searchBtn = document.getElementById('searchBtn');
const cityNameElement = document.getElementById('cityName');
const weatherIconElement = document.getElementById('weatherIcon');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

searchBtn.addEventListener('click', () => {
    console.log("Button clicked"); // Add this line
    const cityInput = document.getElementById('cityInput').value;
    if (cityInput) {
        getWeather(cityInput);
    }
});


async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        cityNameElement.textContent = data.name;
        weatherIconElement.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">`;
        temperatureElement.textContent = `${data.main.temp}°C`;
        descriptionElement.textContent = data.weather[0].description;
        
        document.querySelector('.weather-info').style.display = 'block';
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}
// Add this code to your existing script.js

async function getForecast(city) {
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    
    try {
        const forecastResponse = await fetch(forecastApiUrl);
        const forecastData = await forecastResponse.json();
        
        // Get daily forecasts
        const dailyForecasts = forecastData.list.filter(item => item.dt_txt.includes("12:00:00"));

        // Populate the daily forecast section
        const dailyForecastContainer = document.querySelector('.daily-forecast');
        dailyForecastContainer.innerHTML = '';

        dailyForecasts.forEach(dailyForecast => {
            const forecastItem = document.createElement('div');
            forecastItem.classList.add('forecast-item');
            forecastItem.innerHTML = `
                <div class="day">${getDayOfWeek(dailyForecast.dt)}</div>
                
                <div class="temperature">${dailyForecast.main.temp}°C</div>
            `;
            dailyForecastContainer.appendChild(forecastItem);
        });
    } catch (error) {
        console.error('Error fetching forecast data:', error);
    }
}

function getDayOfWeek(timestamp) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date(timestamp * 1000);
    return daysOfWeek[date.getDay()];
}

function getWeatherIconUrl(iconCode) {
    // Implement your logic to map icon codes to URLs
}

searchBtn.addEventListener('click', () => {
    const cityInput = document.getElementById('cityInput').value;
    if (cityInput) {
        getWeather(cityInput);
        getForecast(cityInput); // Call the forecast function
    }
});
