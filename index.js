function formatDate(date) {
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let dayIndex = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[dayIndex];
  
    return `${day} ${hours}:${minutes}`;
  }
  
  function displayForecast() {
    let forecastElement = document.querySelector("#forecast");
    let days = ["Mon", "Tue", "Wed", "Thu"];
    let forecastHTML = `<div class="row">`;
    days.forEach(function (day) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2 text-center">
        <div class="weather-forecast-date">${day}</div>
        <div class="newIcon">
        <img src="http://openweathermap.org/img/wn/01d@2x.png" id="newIcon"/>
      </div>
          <p class="card-text" id="max">
            <strong> 21º </strong> | <span id="min">16º</span>
          </p>
        </div>`;
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  }


  function displayWeatherC(response) {
    document.querySelector("#mCity").innerHTML = response.data.name;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#mainDegreesMax").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#type-Weather").innerHTML = response.data.weather[0].main;
     /*document.querySelector("#icon").setAttribute = (`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);*/
  
  
     let iconElement = document.querySelector("#icon");
     iconElement.setAttribute(
       "src",
       `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
     );
     iconElement.setAttribute("alt", response.data.weather[0].description);
  
     celsiusTemperature = response.data.main.temp;
     }
  
  function showCity(event) {
    event.preventDefault();
    let apiKey ="68f3915a75420edb9d9f25f95e630a55";
    let city = document.querySelector("#city-input").value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherC);

  }
  function searchLocation(position) {
    let apiKey = "68f3915a75420edb9d9f25f95e630a55";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${
      position.coords.latitude
    }&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(displayWeatherC);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchCity(city);
  }
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", showCity);
  
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  
  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  
  dateElement.innerHTML = formatDate(currentTime);
  
  let currentLocationButton = document.querySelector("#pin");
  currentLocationButton.addEventListener("click", getCurrentLocation);
  
  function displayFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#mainDegreesMax");
  
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  }
  
  function displayCelsiusTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#mainDegreesMax");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
  }
  
  let celsiusTemperature = null;
  
  
  let form = document.querySelector("#search-form");
  form.addEventListener("submit", handleSubmit);
  
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
  
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", displayCelsiusTemperature);

displayForecast();