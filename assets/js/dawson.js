let restaurantImageDisplay1 = document.getElementById("image1");
const img = document.createElement("img");
var imgSrcOne = document.getElementById("imageOne");
var imgSrcTwo = document.getElementById("imageOne");
var imgSrcThree = document.getElementById("imageOne");
var imgSrcFour = document.getElementById("imageOne");
var restaurantsDisplay = $("#restaurants");
function restaurants(cityName) {
  const encodedParams = new URLSearchParams();
  encodedParams.append("q", cityName);
  encodedParams.append("language", "en_US");
  let cityCode = 0;
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Host": "worldwide-restaurants.p.rapidapi.com",
      "X-RapidAPI-Key": "a9ead3f843msh2212025a98c2772p142d07jsn6a69bddd4809",
    },
    body: encodedParams,
  };

  fetch("https://worldwide-restaurants.p.rapidapi.com/typeahead", options)
    .then((response) => response.json())
    .then((results) => {
      cityCode = results.results.data[0].result_object.location_id;
      console.log(results);
      console.log(cityCode);
      //   .catch((err) => console.error(err));
      const encodedParams1 = new URLSearchParams();
      encodedParams1.append("language", "en_US");
      encodedParams1.append("limit", "6");
      encodedParams1.append("location_id", cityCode);
      encodedParams1.append("currency", "USD");

      const options1 = {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Host": "worldwide-restaurants.p.rapidapi.com",
          "X-RapidAPI-Key":
            "a9ead3f843msh2212025a98c2772p142d07jsn6a69bddd4809",
        },
        body: encodedParams1,
      };

      fetch("https://worldwide-restaurants.p.rapidapi.com/search", options1)
        .then((response) => response.json())
        .then((data) => {
          restaurantFunc(data);

          console.log(data).catch((err) => console.error(err));
        });
    });
}
var restaurantFunc = function (data) {
  
  for (var i = 0; i <= 6; i++) {
    var restaurantName = $("<p>").text(data.results.data[i].name); 
    var restaurantImage = $(
      "<img src=" + data.results.data[i].photo.images.small.url + ">"
    );
    var cuisine = $("<p>").text(data.results.data[i].cuisine[0].name);
    var restaurantCard = $("<div>").addClass("card col s3 m4");
    var price = $("<p>").text(data.results.data[i].price_level);
    var phone = $("<p>").text(data.results.data[i].phone);
    var caption = $("<p>").text(data.results.data[i].photo.caption);
    restaurantsDisplay.append(restaurantCard);
    restaurantCard.append(restaurantImage, restaurantName, cuisine, price, phone, caption);
  }

 
};
