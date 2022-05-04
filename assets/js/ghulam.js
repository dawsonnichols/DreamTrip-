


// Getting weather API

function getCurrentWeather(cityName) {
    var currentUrl = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=60912993e53c4b95122f3139db219ebb";
      console.log(currentUrl);
    fetch(currentUrl)
    .then(function (response) {
        console.log(response);
        if (response.ok) {
            return response.json()
        }
        else {
            alert("Error: Please enter a city name.");
        }
    })
    .then(function (data) {

      displayCurrentWeather(data);
       getForecast(data);
        console.log(data);
        
    }) 

    .catch(function() {
        alert("Unable to find the city.");
        displayList();
    })
    
};

  //  Displaying current weather
  var city = $("#city");
  var title = $("#current-title");
  var currentWeatherEl = $("#current-weather");
  
  
  var displayCurrentWeather = function (data) {
    currentWeatherEl.empty();
    city.text(data.name);
    
    var currentWeather = $("<p>").text("Current Weather");
    var currentDate = $("<p>").text(" (" + moment().format("MM/DD/YYYY") + ") ");
    var currentIcon = $("<img src=http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png>").addClass("icon");
    var currentTemp = $("<p>").text("Temp: " + ((data.main.temp - 273.15) * 1.8 + 32).toFixed() + "°F");
    var currentWind = $("<p>").text("Wind: " + data.wind.speed + " MPH");
    var currentHumidity = $("<p>").text("Humidity: " + data.main.humidity + "%");
    currentWeatherEl.addClass("card col s10");
  
    title.append(currentWeather);
    currentWeatherEl.append(currentDate, currentIcon, currentTemp, currentWind, currentHumidity);
    
  };
  

// get 4-day forecast API
var getForecast = function (data) {
    var cityLat = data.coord.lat;
    var cityLon = data.coord.lon;

    var forecastUrl ="https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat +"&lon=" + cityLon +"&exclude=minutely,hourly&appid=60912993e53c4b95122f3139db219ebb";
  
    fetch(forecastUrl).then(function (response) {
      response.json().then(function (data) {
        displayForecast(data);
      });
    });
  };


// get 4-day forecast API
var getForecast = function (data) {
    var cityLat = data.coord.lat;
    var cityLon = data.coord.lon;

    var forecastUrl ="https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat +"&lon=" + cityLon +"&exclude=minutely,hourly&appid=60912993e53c4b95122f3139db219ebb";
  
    fetch(forecastUrl).then(function (response) {
      response.json().then(function (data) {
        displayForecast(data);
      });
    });
  };

// Displaying 4-day forecast
var forecastTitle = $("#f-title");
var forecast = $("#forecast");


var displayForecast = function (data) {
  var forecastTitle = $("#f-title");
  forecastTitle.text("4-Days Weather Forecast");

  // Getting UVI
  function uviColor() {

    var uviEl = data.current.uvi;
    var uvIndex = $("<span>").text(uviEl);
    var uvi = $("<p>").text("UV Index: ");

    if (uviEl >= 0 && uviEl <= 2) {uvIndex.addClass("green uvi");
    } else if (uviEl > 2 && uviEl <= 5) {uvIndex.addClass("yellow uvi");
    } else if (uviEl > 5 && uviEl <= 7) {uvIndex.addClass("orange uvi");
    } else if (uviEl > 7 && uviEl <= 10) {uvIndex.addClass("red uvi");
    } else {uviEl.addClass("purple uvi");}

    uvIndex.appendTo(uvi);
    currentWeatherEl.append(uvi);
  }
  uviColor();
  

 // 4 days loop forecast 
  forecast.empty();
  var forecastTitle = $("<p>").text("");

  for (var i = 1; i < 5; i++) {
    var date = $("<p>").text(moment(data.daily[i].dt * 1000).format("MM/DD/YYYY"));
    var forecastIcon = $("<img src=http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png>").addClass("icon");
    var forecastTemp = $("<p>").text("Temp: " + ((data.daily[i].temp.day - 273.15) * 1.8 + 32).toFixed() + "°F");
    var forecastWind = $("<p>").text("Wind: " + data.daily[i].wind_speed + " MPH");
    var forecastHumidity = $("<p>").text("Humidity: " + data.daily[i].humidity + "%");
    var forecastUviEl = $("<p>").text("UV Index: " + data.daily[i].uvi);
    var forecastCard = $("<div>").addClass("card col s3");

    forecast.append(forecastTitle, forecastCard);
    forecastCard.append(
      date,
      forecastIcon,
      forecastTemp,
      forecastWind,
      forecastHumidity,
      forecastUviEl
    );

  }
};

// Display city weather
$('.list-group').on('click', 'li', function() {
    cityInput = $(this).text();
    getCurrentWeather();
  });
