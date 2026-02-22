const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const Name = document.getElementById("cityName");
const date = document.getElementById("date");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind"); 

let cityName = "";

searchBtn.addEventListener("click",() => {
    cityName = cityInput.value;
    if(cityName === "") return;

    gettingCityName();
});

async function gettingCityName() {
    try {
        const cityURL = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`
    
        const response = await fetch(cityURL);

        const data = await response.json();
        if(!data.results) {
        alert("city not found");
        return;
        }

        const { latitude ,longitude,name,country} = data.results[0];

        Name.innerText = `${name},${country}`;

        gettingWheatherData(latitude,longitude);

    } catch(error) {
        alert("weather api is not supporting");
        return;
    }
};

async function gettingWheatherData(lat,lon) {
    try {
        const wheatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m`;

        const response = await fetch(wheatherURL);
        const data = await response.json();
        const current = data.current_weather;

        date.innerText = new Date().toDateString();
        temperature.innerText = `${current.temperature} °C`;
        wind.innerText = `${current.windspeed} km/h`;
        humidity.innerText = `${data.hourly.relativehumidity_2m[0]} %`;
        description.innerText = "Live Weather Data";
    } catch(error) {
        alert("weather api is not supporting");
    }
};