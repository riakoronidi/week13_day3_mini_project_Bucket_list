const CountryView = require('./views/countryView');
const Request = require('./services/request.js');
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



const appStart= function(){
  countryRequest.get(getCountryRequestComplete);

  //click button and once clicked take the selected country from drop down list
  const createCountryButton = document.querySelector("#submit-country");
  createCountryButton.addEventListener("click", createButtonClicked);


  //pass that selected country in the bucket-list
  // request.get(getCountryRequestFromBucketListComplete);
}

document.addEventListener('DOMContentLoaded', appStart);
