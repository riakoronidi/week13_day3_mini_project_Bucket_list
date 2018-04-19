const CountryView = require('./views/countryView');
const Request = require('./services/request.js');
const MapWrapper = require('./views/mapWrapper');
const countryView = new CountryView();
const countryRequest = new Request('https://restcountries.eu/rest/v2/all');
const request = new Request('http://localhost:3000/api/bucketlist');


const getCountryRequestComplete = function(allCountries){
  allCountries.forEach(function(country){
    countryView.addCountry(country);
  })
  countryView.populateDropDown();
}

const createButtonClicked = function(event){
  event.preventDefault();
  console.log("Submit button clicked");

  // take the selected country from drop down list
  const countySelect = document.querySelector("#country-list");
  const countySelectedValue = countySelect.options[countySelect.selectedIndex].value;

  const countryToSend = {
    name: countySelectedValue
  };
  //add it to the bucket array and display in the browser
  countryView.addCountryToBucketList(countryToSend);

  // request.post(createRequestComplete, countryToSend);
}


const getCountryAddToMap = function(){
  console.log("Map!");
  const container = document.getElementById('main-map');
  const center = {lat: 55.8571, lng: -4.2445};
  const zoom = 3;

  const map = new MapWrapper(container, center, zoom);



}


const appStart= function(){
  countryRequest.get(getCountryRequestComplete);

  //click button and once clicked take the selected country from drop down list
  const createCountryButton = document.querySelector("#submit-country");
  createCountryButton.addEventListener("click", createButtonClicked);

  // debugger;

  //pass that selected country in the map
}

const app = function(){
  request.get(getCountryAddToMap);
}

document.addEventListener('DOMContentLoaded', appStart);

window.addEventListener('load', app);
