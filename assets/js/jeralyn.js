var geoContainer=document.getElementById('city');

fetch(
    "https://ipgeolocation.abstractapi.com/v1/?api_key=dd4801d4daad4dd9b8407e3557ee14d7"
)
    .then(function(response){
         return response.json();
        })
        .then(function(data){
        console.log(data);

        var cityName=document.getElementById('displayCity');

        cityName.textContent = data.city;   
        getCurrentWeather(cityName.textContent);  
          
});












