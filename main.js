document.querySelector('button').addEventListener('click', getWeather);

const result = document.querySelector('#result');
const errorImg = document.getElementById('error');
const errorText = document.querySelector('#error-text');
const info = document.querySelector('.error-info');
const searchVal = document.getElementById('name');
const country = document.getElementById('country');
const humidity = document.getElementById('humidity');
const weather = document.getElementById('weather-info');
const weatherDesc = document.getElementById('desc');
const windSpeed = document.getElementById('wind-speed');
const maxTemp = document.getElementById('temp-max');
const minTemp = document.getElementById('temp-min');

async function getWeather() {
  try {
    const city = document.querySelector('input').value;

    if (!city || city === undefined) {
      console.log('Abeg enter something');
      result.style.display = 'none';
      info.style.display = 'block';
      fetch(
        'https://api.giphy.com/v1/gifs/translate?api_key=t0m0X6OoYaTLbwbRaftiW4L9IULGXEtc&s=cats',
        { mode: 'cors' }
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          errorText.textContent = 'Enter a location';
          errorImg.src = response.data.images.original.url;
        });
    } else {
      info.style.display = 'none';
      result.style.display = 'block';
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4a62681a6876be68bd8f700967fefad7`
      );

      const loadInfo = document.querySelector('#loading');
      loadInfo.textContent = 'Loading';
      const weather = await res.json();

      if (weather.name === undefined) {
        console.log('Enter a valid word.');
        loadInfo.textContent = 'Enter a valid word.';
      } else {
        loadInfo.textContent = '';
        searchVal.textContent = `Location: ${weather.name}`;
        humidity.textContent = `Humidity: ${weather.main.humidity}`;
        maxTemp.textContent = `Maximum Temp: ${weather.main.temp_max} ℃`;
        minTemp.textContent = `Minimum Temp: ${weather.main.temp_min} ℃`;
        weather.textContent = `Weather: ${weather.weather[0].main}`;
        weatherDesc.textContent = `Description: ${weather.weather[0].description}`;
        windSpeed.textContent = `Wind-speed: ${weather.wind.speed}`;
        console.log(weather);
      }
    }
  } catch (error) {
    console.error(error);
  }
}
