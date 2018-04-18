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

const appStart= function(){
  countryRequest.get(getCountryRequestComplete);

  // request.get(getCountryRequestFromBucketList);

}

document.addEventListener('DOMContentLoaded', appStart);
