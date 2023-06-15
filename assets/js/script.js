var API_KEY = '905c5677ef9598108ef712c3c6f027d0';
var searchCity = document.getElementById("search-city");
var searchBtn = document.querySelector(".search-button");
var cityList = document.getElementById("city-list");

// Load the stored cities from local storage
var storedCities = JSON.parse(localStorage.getItem("cities")) || [];

// Function to save a city to local storage
function saveCity(city) {
  var capitalizedCity = city.toUpperCase();
  storedCities.push(capitalizedCity);
  localStorage.setItem("cities", JSON.stringify(storedCities));
}

// Function to render the list of cities in the city list
function renderCityList() {
  cityList.innerHTML = ""; // Clear previous city list

  storedCities.forEach(function (city) {
    var listItem = document.createElement("li");
    listItem.textContent = city;
    listItem.classList.add("city-list-item");
    cityList.appendChild(listItem);

    // Add click event listener to each city item
    listItem.addEventListener("click", function () {
      getApi(city);
    });
  });
}

// Initial render of the city list
renderCityList();

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
        var date = new Date(data.list[i].dt_txt);
        var formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        forecastDate.textContent = formattedDate;

        var forecastIcon = document.createElement("img");
        forecastIcon.classList.add("forecast-icon");
        forecastIcon.src = "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png";

        var forecastTemp = document.createElement("p");
        forecastTemp.innerHTML = "Temp: <span class='forecast'>" + data.list[i].main.temp + "°F</span>";

        var forecastWind = document.createElement("p");
        forecastWind.innerHTML = "Wind: <span class='forecast'>" + data.list[i].wind.speed + " MPH</span>";

        var forecastHumidity = document.createElement("p");
        forecastHumidity.innerHTML = "Humidity: <span class='forecast'>" + data.list[i].main.humidity + "%</span>";

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
    // Check if the city already exists in the stored cities
    var cityExists = storedCities.some(function (city) {
      return city.toLowerCase() === cityName.toLowerCase();
    });

    if (!cityExists) {
      saveCity(cityName); // Save the searched city to local storage
      renderCityList(); // Re-render the city list
    }

    getApi(cityName);
    searchCity.value = ""; // Clear the search input
  }
});
