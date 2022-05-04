function restaurants() {
const encodedParams = new URLSearchParams();
encodedParams.append("q", );
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
  .then((response) => {
    cityCode = response.data[0].result_object.location_id;
    console.log(response);
    //   .catch((err) => console.error(err));
  });
const encodedParams1 = new URLSearchParams();
encodedParams1.append("language", "en_US");
encodedParams1.append("limit", "4");
encodedParams1.append("location_id", + cityCode);
encodedParams1.append("currency", "USD");

const options1 = {
  method: "POST",
  headers: {
    "content-type": "application/x-www-form-urlencoded",
    "X-RapidAPI-Host": "worldwide-restaurants.p.rapidapi.com",
    "X-RapidAPI-Key": "a9ead3f843msh2212025a98c2772p142d07jsn6a69bddd4809",
  },
  body: encodedParams1,
};

fetch("https://worldwide-restaurants.p.rapidapi.com/search", options1)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((err) => console.error(err));
}
// //first.js
// const colorCode = {
//   black: "#000",
//   white: "#fff"
// };
// export { colorCode };
// Then, import the variable in second file using import.

// //second.js
// import { colorCode } from './first.js'

// get variables across .js files if its in global scope, careful of "race condition". 
