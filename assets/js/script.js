var API_KEY = '905c5677ef9598108ef712c3c6f027d0';
var searchCity = document.getElementById("search-city");
var searchBtn = document.querySelector(".search-button");

function getApi(cityName) {
  var queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=imperial`;

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Update the current weather section
      var currentCityElement = document.getElementById("current-city");
      currentCityElement.textContent = data.city.name + " (" + new Date().toLocaleDateString() + ")";
      currentCityElement.classList.add("forecast-title");

      var weatherIcon = document.createElement("img");
      weatherIcon.classList.add("weather-icon");
      weatherIcon.src = "https://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png";
      document.getElementById("current-city").appendChild(weatherIcon);
      document.getElementById("temperature").textContent = data.list[0].main.temp + " °F";
      document.getElementById("humidity").textContent = data.list[0].main.humidity + "%";
      document.getElementById("wind-speed").textContent = data.list[0].wind.speed + " MPH";

      // Create forecast cards for the 5 days
      var forecastContainer = document.querySelector(".forecast-container");
      forecastContainer.innerHTML = ""; // Clear previous forecast cards

      for (var i = 0; i < 5; i++) {
        var forecastCard = document.createElement("div");
        forecastCard.classList.add("forecast-card");
        var forecastDate = document.createElement("h4");
        forecastDate.classList.add("forecast-date");
        var forecastIcon = document.createElement("img");
        forecastIcon.classList.add("forecast-icon");
        var forecastTemp = document.createElement("p");
        forecastTemp.innerHTML = "Temp: <span class='forecast'>" + data.list[i].main.temp + "°F</span>";
        var forecastHumidity = document.createElement("p");
        forecastHumidity.innerHTML = "Humidity: <span class='forecast'>" + data.list[i].main.humidity + "%</span>";
        var forecastWind = document.createElement("p");
        forecastWind.innerHTML = "Wind: <span class='forecast'>" + data.list[i].wind.speed + " MPH</span>";

        // Get the date and format it as "M/D/YYYY"
        var date = new Date(data.list[i].dt_txt);
        var formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

        forecastDate.textContent = formattedDate;
        forecastIcon.src = "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png";

        forecastCard.appendChild(forecastDate);
        forecastCard.appendChild(forecastIcon);
        forecastCard.appendChild(forecastTemp);
        forecastCard.appendChild(forecastWind);
        forecastCard.appendChild(forecastHumidity);
        forecastContainer.appendChild(forecastCard);
      }
    })
    .catch(function (error) {
      console.log("Error:", error);
    });
}

// When clicking on the search button, get the API data of the city and show it on the page
searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  var cityName = searchCity.value.trim(); // Get the entered city name and remove leading/trailing whitespace
  if (cityName) {
    getApi(cityName);
  }
});
