"use strict"

const weatherBlock = document.querySelector('#weather');

async function loadWeather(e) {
    weatherBlock.innerHTML = `
        <div class="weather__loading">
            <img src="icons/loaded.gif" alt="loading">
        </div>`;

        const server = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=Buchach&appid="your key"';
        const response = await fetch(server, {
            method: 'GET',
        });
        const responseResult = await response.json();

        if (response.ok) {
            getWeather(responseResult);
        } else {
            weatherBlock.innerHTML = responseResult.message
        }
}

function getWeather(data){

    const location = data.name;
    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const weatherStatus = data.weather[0].main;
    const weatherIcon = data.weather[0].icon;

    const template = `
            <div class="weather__header">
                <div class="weather__main">
                    <div class="weather__city">${location}</div>
                    <div class="weather__status">${weatherStatus}</div>
                </div>
                <div class="weather__icon">
                    <img src="${weatherIcon}" alt="Clouds">
                </div>
            </div>
            <div class="weather__temp">${temp}</div>
            <div class="weather__feels-like">${feelsLike}</div>
    `;

    weatherBlock.innerHTML = template;
    
}

if (weatherBlock) {
    loadWeather();
}
