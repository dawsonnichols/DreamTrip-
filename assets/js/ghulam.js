// Getting weather API

function getCurrentWeather(cityName) {
  var currentUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=60912993e53c4b95122f3139db219ebb";
  console.log(currentUrl);
  fetch(currentUrl)
    .then(function (response) {
      console.log(response);
      if (response.ok) {
        return response.json();
      }
    })
    .then(function (data) {
      displayCurrentWeather(data);
      getForecast(data);
      console.log(data);
    })

    .catch(function () {
      alert("Unable to find the city.");
    });
}

//  Displaying current weather
var city = $("#city");
var temp = $("#temp");
var iconn = $("#current");
var currentWeatherEl = $("#all1");
var humidity1 = $("#all2");
var uvi3 = $("#all3");

var displayCurrentWeather = function (data) {
  city.text(data.name);

  var currentIcon = $(
    "<img src=http://openweathermap.org/img/wn/" +
      data.weather[0].icon +
      "@2x.png>"
  ).addClass("icon");
  var currentTemp = $("#temp").text(
    ((data.main.temp - 273.15) * 1.8 + 32).toFixed() + "°F"
  );
  var currentWind = $("<p>").text("Wind: " + data.wind.speed + " MPH");
  var currentHumidity = $("<p>").text("Humidity: " + data.main.humidity + "%");
  currentWeatherEl.addClass("row");

  temp.append(currentTemp);
  iconn.append(currentIcon);
  humidity1.append(currentHumidity);
  currentWeatherEl.append(currentWind);
};

function displayBackground(color) {
  var backgroundImage = url;

  /*if(temp > -10 && temp <= 0){
    color='rgba(50,97,214, 0.4)'
  }else if(temp > 1 && temp <= 15){
    color='rgba(244,244,244, 0.4)'
  }else if(temp > 16 && temp <= 25){
    color='rgba(244,204,0, 0.4)'
  }else if(temp > 26){
    color='rgba(216,128,48, 0.4)'
  };
  $('container').css('background',color)
}*/
  displayBackground();
}

// get 4-day forecast API
var getForecast = function (data) {
  var cityLat = data.coord.lat;
  var cityLon = data.coord.lon;

  var forecastUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    cityLat +
    "&lon=" +
    cityLon +
    "&exclude=minutely,hourly&appid=60912993e53c4b95122f3139db219ebb";

  fetch(forecastUrl).then(function (response) {
    response.json().then(function (data) {
      displayForecast(data);
    });
  });
};

// Displaying 4-day forecast
var forecast = $("#forecast");

var displayForecast = function (data) {
  // Getting UVI
  function uviColor() {
    var uviEl = data.current.uvi;
    var uvIndex = $("<span>").text(uviEl);
    var uvi = $("<p>").text("UV Index: ");

    if (uviEl >= 0 && uviEl <= 2) {
      uvIndex.addClass("green uvi");
    } else if (uviEl > 2 && uviEl <= 5) {
      uvIndex.addClass("yellow uvi");
    } else if (uviEl > 5 && uviEl <= 7) {
      uvIndex.addClass("orange uvi");
    } else if (uviEl > 7 && uviEl <= 10) {
      uvIndex.addClass("red uvi");
    } else {
      uviEl.addClass("purple uvi");
    }

    uvIndex.appendTo(uvi);
    uvi3.append(uvi);
  }
  uviColor();

  // 4 days loop forecast
  for (var i = 1; i < 5; i++) {
    var date = $("<p>").text(moment(data.daily[i].dt * 1000).format("dddd")).addClass("flow-text");
    var forecastIcon = $(
      "<img src=http://openweathermap.org/img/wn/" +
        data.daily[i].weather[0].icon +
        "@2x.png>"
    ).addClass("icon");
    var forecastTemp = $("<p>").text(
      ((data.daily[i].temp.day - 273.15) * 1.8 + 32).toFixed() + "°F"
    );
    var forecastCard = $("<div>").addClass("col s3");
    forecast.append(forecastCard);
    forecastCard.append(date, forecastIcon, forecastTemp);
  }
};
