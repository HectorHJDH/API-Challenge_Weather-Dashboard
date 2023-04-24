var api_KEY = '905c5677ef9598108ef712c3c6f027d0';
LAT = 44;
LON = 44;
var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + LAT + '&lon=' + LON + '&appid=' + api_KEY;

fetch(queryURL)