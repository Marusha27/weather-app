function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#current-city-input");

  let entercity = document.querySelector("#currentCity");
  entercity.innerHTML = cityInput.value;
}
let form = document.querySelector("#current-city");
form.addEventListener("submit", search);

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
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("h3");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "f8313846ad3a4b7f262248aa77fb3db4";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  let iconUrl = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
  iconElement.setAttribute("src", iconUrl);

  celsiusTemperature = response.data.main.temp;
}

function searchCity(city) {
  let apiKey = "f8313846ad3a4b7f262248aa77fb3db4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function Submit(event) {
  event.preventDefault();
  let city = document.querySelector("#current-city-input").value;
  searchCity(city);
}
function searchLocation(position) {
  let apiKey = "f8313846ad3a4b7f262248aa77fb3db4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#current-city");
searchForm.addEventListener("submit", Submit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemp = Math.round((celsiusTemperature * 9) / 5 + 32);
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
