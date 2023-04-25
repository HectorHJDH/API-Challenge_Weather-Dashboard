var API_KEY = '905c5677ef9598108ef712c3c6f027d0';
// New York coords

// variables
let city = '';
let searchCity = $("#search-city");
let searchButton = $("#search-button");
let currentCity = $("#current-city");
let currentTemperature = $("#temperature");
let currentHumidty = $("#humidity");
let currentWSpeed = $("#wind");
let sCity=[];

function displayWeather(event){
  event.preventDefault();
  if(searchCity.val().trim()!==""){
    city=searchCity.val().trim();
    currentWeather(city);
  }
}

function weather(city) {
  var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + LAT + '&lon=' + LON + '&appid=' + API_KEY;
  
  fetch(queryURL)
  .then(function (response) {
    console.log(response);
  })
}
