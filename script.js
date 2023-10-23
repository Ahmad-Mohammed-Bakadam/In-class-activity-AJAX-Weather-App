function getWeatherIcon(weatherCode) {
    const weatherIcons = {
        "0": "☀️", 
        "1": "🌥️", 
        "2": "🌥️", 
        "3": "☁️", 
    };

    return weatherIcons[weatherCode] || "❓"; 
}

function getWeatherDescription(weatherCode) {
    const weatherDescriptions = {
        "0": "Clear sky",
        "1": "Mainly clear",
        "2": "Partly cloudy",
        "3": "Overcast",
    };

    return weatherDescriptions[weatherCode] || "Unknown"; 
}

function updateWeather(icon, description, temperature) {
    const weatherIcon = document.getElementById("weather-icon");
    const weatherDescription = document.getElementById("weather-description");
    const weatherTemperature = document.getElementById("weather-temperature");

    weatherIcon.textContent = icon;
    weatherDescription.textContent = description;
    weatherTemperature.textContent = temperature;
}

function getWeatherUsingXHR() {
    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            const todayTemp = data.current.temperature_2m;
            const weatherCode = data.current.weathercode;
            const icon = getWeatherIcon(weatherCode);
            const description = getWeatherDescription(weatherCode);
            const temperature = `${todayTemp}°C`;

            updateWeather(icon, description, temperature);
        }
    };

    xhr.open(
        "GET",
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&current=weathercode`,
        true
    );
    xhr.send();
}

function getWeatherUsingFetch() {
    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;

    fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&current=weathercode`
    )
        .then((response) => response.json())
        .then((data) => {
            const todayTemp = data.current.temperature_2m;
            const weatherCode = data.current.weathercode;
            const icon = getWeatherIcon(weatherCode);
            const description = getWeatherDescription(weatherCode);
            const temperature = `${todayTemp}°C`;

            updateWeather(icon, description, temperature);
        })
        .catch((e) => {
            console.log("Error: " + e);
        });
}

async function getWeatherUsingFetchAsyncAwait() {
    const latitude = document.getElementById("latitude").value;
    const longitude = document.getElementById("longitude").value;

    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&current=weathercode`
        );
        const data = await response.json();

        const todayTemp = data.current.temperature_2m;
        const weatherCode = data.current.weathercode;
        const icon = getWeatherIcon(weatherCode);
        const description = getWeatherDescription(weatherCode);
        const temperature = `${todayTemp}°C`;

        updateWeather(icon, description, temperature);
    } catch (e) {
        console.log("Error: " + e);
    }
}
