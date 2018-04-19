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

const getBucketRequestComplete = function(bucketList){
  const ul = document.getElementById("countries");
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
  bucketList.forEach(function(country){
    countryView.addCountryToBucketList(country);
  })
}

const addCountryRequestComplete = function(allCountries){
  const countrySelect = document.querySelector("#country-list");
  const countrySelectedValue = countrySelect.options[countrySelect.selectedIndex].value;
  const ul = document.getElementById("countries");
  const listItems = ul.getElementsByTagName("li");
  const listItemsNames = [];

  for (let i = 0; i < listItems.length; ++i) {
    listItemsNames.push(listItems[i].textContent);
  }
  const duplicateBoolean = _.includes(listItemsNames, countrySelectedValue);
  if (duplicateBoolean === false) {
    allCountries.forEach(function(country){
      if (country.name === countrySelectedValue){
        const countrySelectedObject = country;
        request.post(recallBucketList, countrySelectedObject);
      }
    });
  }
  else {
    console.log("Already in list!");
  }
}

const recallBucketList = function(){
  request.get(getBucketRequestComplete);
}

const createButtonClicked = function(event){
  event.preventDefault();
  countryRequest.get(addCountryRequestComplete);
}

// const createButtonClicked = function(event){
//   event.preventDefault();
//   console.log("Submit button clicked");
//
//   // take the selected country from drop down list
//   const countySelect = document.querySelector("#country-list");
//   const countySelectedValue = countySelect.options[countySelect.selectedIndex].value;
//
// const countryToSend = {
//   name: countySelectedValue
// };
// //add it to the bucket array and display in the browser
// countryView.addCountryToBucketList(countryToSend);
//
//   // request.post(createRequestComplete, countryToSend);
// }
const getCountryAddToMap = function(){
  console.log("Map!");
  const container = document.getElementById('main-map');
  // const center = {lat: 33, lng: 65};
  const center = countryView.getCoords();
  const zoom = 3;

  const map = countryView.callMap();

}

const appStart= function(){
  // debugger;
  countryRequest.get(getCountryRequestComplete);
  request.get(getBucketRequestComplete);

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
