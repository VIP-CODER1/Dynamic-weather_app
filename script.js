const searchBtn = document.querySelector('#search-btn');
const weatherImg = document.querySelector('.weather-img');
const temp = document.querySelector('.temp');
const desc = document.querySelector('.desc');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#wind-speed');

function getWeatherImage(temp) {
    if (temp >= 30) {
        return 'clear.png';
    } 
    else if (temp >= 25) {
        return 'cloud.png';
    }
    else if (temp >= 20) {
        return 'cloud.jpg';
    } else if (temp >= 15) {
        return 'rain.png';
    } else if (temp >= 10) {
        return 'mist.png';
    } 
    else if (temp >= 5) {
        return 'mist.png';
    }
    else {
        return 'snow.jpeg';
    }
}

async function checkWeather(city) {
    const apiKey = "b1afac23fad49a6dd167a766bccc9069";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const weatherData = await fetch(url).then(response => response.json());

    if (weatherData.cod === 200) { 
        const temperature = Math.round(weatherData.main.temp);
        temp.innerHTML = `${temperature}°C`;
        desc.innerHTML = `${weatherData.weather[0].description}`;
        humidity.innerHTML = `${weatherData.main.humidity}%`;
        windSpeed.innerHTML = `${weatherData.wind.speed} Km/hr`;

        const imagePath = getWeatherImage(temperature);
        weatherImg.src = imagePath;
    } else {
        alert('City not found');
    }
}

searchBtn.addEventListener('click', () => {
    const inputBox = document.querySelector('.input-box');
    checkWeather(inputBox.value);
});
